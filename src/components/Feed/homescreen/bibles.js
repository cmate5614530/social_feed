import React from "react";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import { MDBRow, MDBCol } from 'mdbreact';
import Loading from "../../Shared/loading";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import {Typography,Card,CardContent,CardActions} from "@material-ui/core";
import axios from "axios";
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import './bibles.css'
const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 160
  },
  formControl1: {
    margin: theme.spacing(2),
    width:'60px'
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  input: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },

}));
export default function Bibles(props) {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(true);
  const [optionData, setOptionData] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [chapter, setChapter] = React.useState('MAT.1');
  const [chapterData, setChapterData] = React.useState('');
  const [bookList, setBookList] = React.useState([]);
  const [searchVal, setSearchVal] = React.useState('');
  const [description1,setDescription1] = React.useState('');

  React.useEffect(() => {
    getbooks();
  }, []);

  async function getbooks() {
    let url = "https://api.scripture.api.bible/v1/bibles/555fef9a6cb31151-01/books?include-chapters=true";
    let options = {
        method:'GET',
        url:url,
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'api-key':'9e63bdad5df21c293b58b6944c253a74'
        }
    };
    let response = await axios(options);
    //books
    let books = response['data']['data'];
    var sortedArray = books.sort(function (a, b) {
      if (a.name < b.name) return -1;
      else if (a.name > b.name) return 1;
      return 0;
    });
    setBookList(books);
    let optionItems_category = books.map((data) =>
        <MenuItem value={data['id']}>{data['name']}</MenuItem>
    );
    setOptionData(optionItems_category);
    
    let bookItem = books.find(item=>item.id === 'MAT')['chapters'];
    let chapters = bookItem.map(item=><MenuItem value={item['id']}>{item['number']}</MenuItem>);
    setChapterData(chapters);

    getDescription('MAT.1');
    setLoading(false);

  }

  function setChapterList(cate){
    let bookItem = bookList.find(item=>item.id === cate)['chapters'];
    let chapters = bookItem.map(item=><MenuItem value={item['id']}>{item['number']}</MenuItem>);
    setChapterData(chapters);
  }

  async function getDescription(item) {
    setLoading(true);
    let url =''
    if (item[4] === 'i' && item[5] === 'n')
      url = "https://api.scripture.api.bible/v1/bibles/555fef9a6cb31151-01/chapters/"+item;
    else
      url = "https://api.scripture.api.bible/v1/bibles/555fef9a6cb31151-01/passages/"+item;
    let options = {
        method:'GET',
        url:url,
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'api-key':'9e63bdad5df21c293b58b6944c253a74'
        }
    };
    let response = await axios(options);
    let initdata = response['data']['data'];
    setCategory(initdata['bookId']);
    setDescription(initdata['content']);
    setLoading(false);
  }

  async function mysearch(val){
    if(!!val){
      setLoading(true);
      let url="https://api.scripture.api.bible/v1/bibles/555fef9a6cb31151-01/search?query="+val+"&offset=0&limit=1000&sort=canonical&fuzziness=0";
      let options = {
        method:'GET',
        url:url,
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'api-key':'9e63bdad5df21c293b58b6944c253a74'
        }
      };
      let response = await axios(options);
      let initdata = response['data']['data'];
      let verses = initdata['verses'];
      let vers = verses.map(item=><div className = "sea" onClick={(e)=>{getDescription(item['chapterId']);setDescription1('');setSearchVal('');setCategory(item['bookId']);setChapterList(item['bookId']);setChapter(item['chapterId']);}}><p><b>{item['reference']}</b><br/>{item['text']}</p></div>);
      setDescription('');
      setDescription1(vers);
      setLoading(false);
    }else{
      setDescription1('');
      getDescription(chapter);
    }

  }

  if (loading) return <Loading />;
  return (
                    <Grid container>
                      <Grid item xs={12} style={{textAlign:'center'}}>
                          <MDBRow style={{ marginTop: '2%', textAlign:'center' }}>
                            <Input
                              className={classes.input}
                              placeholder="Search"
                              value={searchVal}
                              onChange={(e)=>{
                                e.preventDefault();
                                let sear=e.target.value;
                                setSearchVal(sear);}}
                            />
                            <IconButton type="button" onClick={()=>{mysearch(searchVal)}} className={classes.iconButton} aria-label="search">
                              <SearchIcon />
                            </IconButton>
                          </MDBRow>     
                      </Grid>
                      <Grid xs={12} style={{textAlign:'center'}}>
                            <FormControl className={classes.formControl}>
                                <InputLabel style={{ width: '100%', textAlign: 'left' }}>Book</InputLabel>
                                <Select                                 
                                    value={category}
                                    style={{textAlign:'left'}}
                                    onChange={(e) => {
                                        let category = e.target.value;
                                        setCategory(category);
                                        setChapterList(category); 
                                       
                                    }}
                                    inputProps={{
                                        name: 'Category',
                                        id: 'Category',
                                    }}
                                >
                                    {optionData}
                                </Select>
                            </FormControl>
                      
                            <FormControl className={classes.formControl1}>
                                <InputLabel style={{ width: '100%', textAlign: 'left' }}>Chapter</InputLabel>
                                <Select
                                    style={{textAlign:'left'}}
                                    value={chapter}
                                    onChange={(e) => {
                                        let chapter = e.target.value;
                                        setChapter(chapter);
                                        getDescription(e.target.value); 
                                        setSearchVal('');
                                        setDescription1('');

                                    }}
                                    inputProps={{
                                        name: 'Chapter',
                                        id: 'Chapter',
                                    }}
                                >
                                    {chapterData}
                                </Select>
                            </FormControl>
                    </Grid>
                    <br/>
                    <Grid item md={12} sm={12}>
                      <Card>
                        <CardContent>
                            <MDBRow style={{ marginTop: '2%', marginLeft:'6%',marginRight:'6%' }}>
                                <MDBCol md={2}>
                                    <FormControl style={{ width: '100%', textAlign: 'left' }}>
                                        <p dangerouslySetInnerHTML={{__html:description}}></p>
                                        {description1}
                                    </FormControl>
                                </MDBCol>
                            </MDBRow>
                        </CardContent>
                        <CardActions>
                          {/* <div
                            style={{
                              textAlign: "right",
                              width: "100%",
                              padding: "8px",
                              borderTop: "1px solid #ccc"
                            }}
                          >
                                <Button
                                  //onClick={()=>{setValues(category)}}
                                  size="small"
                                  variant="outlined"
                                  color="primary"
                                >
                                  Next
                                </Button>
                          </div> */}
                        </CardActions>
                      </Card>
                      <Typography variant={"h6"}></Typography>
                    </Grid>
                  </Grid>);
}
