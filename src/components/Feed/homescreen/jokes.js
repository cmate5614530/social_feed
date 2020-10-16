import React from "react";
import * as firebase from "firebase";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import { MDBRow, MDBCol } from 'mdbreact';
import Loading from "../../Shared/loading";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import {Typography,Card,CardContent,Button,CardActions} from "@material-ui/core";

const firebaseConfig = {
  apiKey: "AIzaSyA5lo54GCxk44ngE-rnBXbxWnRPyUiY7ds",
  authDomain: "twitter-c4f58.firebaseapp.com",
  databaseURL: "https://twitter-c4f58.firebaseio.com",
  projectId: "twitter-c4f58",
  storageBucket: "twitter-c4f58.appspot.com",
  messagingSenderId: "929715180649",
  appId: "1:929715180649:web:40ed3be82954497b333ef8",
  measurementId: "G-NXT29963VB"
};

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));
export default function Jokes(props) {
  const classes = useStyles();
  const [last, setLast] = React.useState('');
  const [database, setDatabase] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [optionData, setOptionData] = React.useState('');
  const [mix, setMix] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [categoryRand, setCategoryRand] = React.useState('');
  const [pn, setPn] = React.useState(0);

  React.useEffect(() => {
    initialize();
  }, []); 
  
  async function initialize() {//make random category, get 20 jokes by using made-category from db, and then make random joke in the list.
    !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
    setLoading(true);
    let temp = await firebase.database();     
    setDatabase(temp);
    let categorydata = ['Animals','Bar/Blonde','Family','Just Stupid','Men/Women','Military/Police','Miscellaneous','Political','Profession','Religion','Yo Mama'];
    let categoryname = categorydata[Math.floor(Math.random() * categorydata.length)];
    temp
      .ref("/joke")
      .orderByChild("category")
      .equalTo(categoryname)
      .limitToFirst(20)
      .once("value")
      .then(function(snapshot) {
        let val = snapshot.val();
        let mixdata = [];    //[{'body':'...', category:'...'},{...}]
        setPn(Object.values(val).length);
        for (var i = 1 ; i < Object.values(val).length ; i ++) {
            mixdata.push(Object.values(val)[i]);
        }
        let categoryarray = categorydata;

        setCategoryRand(categoryarray);
        
        let optionItems_category = categoryarray.map((data) =>
                      <MenuItem value={data}>{data}</MenuItem>
                  );
        setMix(mixdata);
        setOptionData(optionItems_category);
        let randmix = Math.floor(Math.random() * mixdata.length);
        setCategory(categoryname);
        setDescription(mixdata[randmix].body);
        setLast(Object.keys(val)[Object.keys(val).length-1]);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }
  
  //set joke with selected category
  const setValues = (value) => {
    if (mix.length === 0 && pn > 19){
      refetch(category);
    }else{
      setLoading(true);
      let valueArray = mix.filter(item => item.category === value);
      if (valueArray.length > 0) {
          let defaultValues = valueArray[Math.floor(Math.random() * valueArray.length)];
          const { body = '' } = defaultValues;
          setDescription(body);
          if(mix.findIndex(item=>item.body === body) !== -1){
            mix.splice(mix.findIndex(item=>item.body === body), 1);
            setMix(mix);
          }
      }else{
        setDescription('There is no data to show in this category. Please select another category.');
      }
      setLoading(false);
    }
  }

  //get next page data with current category
  async function refetch(cate){
    if(pn < 20){
      console.log("There is no data to show on the next page");
      alert("There is no data to show on the next page!");
    }else{
    console.log('refetch function');
    setMix('');
    setDescription('');
    setLoading(true);
    setPn(0); 
    database
      .ref("/joke")
      .orderByChild("category")
      .equalTo(cate)
      .startAt(last)
      .limitToFirst(20)
      .on('value',function(snapshot) {
        let val = snapshot.val();
        let mixdata = [];    //[{'body':'...', category:'...'},{...}]
        setPn(Object.values(val).length);
        for (var i = 1 ; i < Object.values(val).length ; i ++) {
            mixdata.push(Object.values(val)[i]);
        }
        setMix(mixdata);
        let randmix = Math.floor(Math.random() * mixdata.length);
        setDescription(mixdata[randmix].body);
        setLast(Object.keys(val)[Object.keys(val).length-1]);
        setLoading(false);
      })
    }  
  }

  //when a category is selected
  async function myfetch(category){
    setLoading(true);
    database
      .ref("/joke")
      .orderByChild("category")
      .equalTo(category)
      .limitToFirst(20)
      .once("value")
      .then(function(snapshot) {
        let val = snapshot.val();
        let mixdata = [];    //[{'body':'...', category:'...'},{...}]
        setPn(Object.values(val).length);
        for (var i = 1 ; i < Object.values(val).length ; i ++) {
            mixdata.push(Object.values(val)[i]);
        }
        setMix(mixdata);
        let randmix = Math.floor(Math.random() * mixdata.length);
        setDescription(mixdata[randmix].body);
        setLast(Object.keys(val)[Object.keys(val).length-1]);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }
  function randjoke(){  
    if(mix.length === 0){
        refetch();
    }else{
        let randmixa = Math.floor(Math.random() * categoryRand.length);
        setCategory(categoryRand[randmixa]);
        let aa=mix.filter(item => item.category === categoryRand[randmixa]);
        if(aa.length === 0){
          setDescription('');
          if (categoryRand.findIndex(item=>item.category === categoryRand[randmixa]) !== -1){
            categoryRand.splice(categoryRand.findIndex(item=>item.category === categoryRand[randmixa]),1);
            setCategoryRand(categoryRand);
          }
        }else{
          let des = aa[Math.floor(Math.random() * aa.length)].body;
          setDescription(des);
          if (mix.findIndex(item=>item.body === des) !== -1){
            mix.splice(mix.findIndex(item=>item.body === des),1);
            setMix(mix);
          }
        }
    }       
  }

  if (loading) return <Loading />;
  return (
                    <Grid container>
                      <Grid item md={12} sm={12}>
                            <FormControl className={classes.formControl}>
                                <InputLabel style={{ width: '60%', textAlign: 'left' }}>Category</InputLabel>
                                <Select
                                   
                                    value={category}
                                    onChange={(e) => {
                                        let category = e.target.value;
                                        setCategory(category);
                                        myfetch(e.target.value); 

                                    }}
                                    inputProps={{
                                        name: 'Category',
                                        id: 'Category',
                                    }}
                                >
                                    {optionData}
                                </Select>
                            </FormControl>
                    </Grid>
                    <Grid item md={12} sm={12}>
                      <Card>
                        <CardContent>
                            <MDBRow style={{ marginTop: '2%', marginLeft:'6%' }}>
                                <MDBCol md={2}>
                                    <FormControl style={{ width: '90%', textAlign: 'left' }}>
                                        {description}
                                    </FormControl>
                                </MDBCol>
                            </MDBRow>
                        </CardContent>
                        <CardActions>
                          <div
                            style={{
                              textAlign: "right",
                              width: "100%",
                              padding: "8px",
                              borderTop: "1px solid #ccc"
                            }}
                          >
                                <Button
                                  size="small"
                                  style={{ marginRight: "8px" }}
                                  variant="outlined"
                                  color="primary"
                                  onClick={()=>{initialize()}}
                                >
                                  Reset
                                </Button>
                                <Button
                                  onClick={()=>{setValues(category)}}
                                  size="small"
                                  variant="outlined"
                                  color="primary"
                                >
                                  Next
                                </Button>
                          </div>
                        </CardActions>
                      </Card>
                      <Typography variant={"h6"}></Typography>
                    </Grid>
                  </Grid>);
}
