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

var firebaseConfig = {
  apiKey: "AIzaSyChZiap_-4C8GDKZTZR-h3guvuQ7Vx5hss",
  authDomain: "buzzraker-c3991.firebaseapp.com",
  databaseURL: "https://buzzraker-c3991.firebaseio.com/",
  projectId: "buzzraker-c3991",
  storageBucket: "buzzraker-c3991.appspot.com",
  messagingSenderId: "779546842393"
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
  const [joke, setJoke] = React.useState('');
  const [categoryRand, setCategoryRand] = React.useState('');
  React.useEffect(() => {
    async function next() {
      !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
      setLoading(true);
      let temp = await firebase.database();     
      setDatabase(temp);
      temp
        .ref("/fun/EglaLkMAPaUkSeknqSaz")
        .orderByKey()
        .limitToFirst(100)
        .once("value")
        .then(function(snapshot) {
          let val = snapshot.val();
          let categorydata = [];
          let mixdata = [];    //[{'joke':'...', category:'...'},{...}]
          for (var i = 1 ; i < Object.values(val).length ; i ++) {
              categorydata.push(Object.values(val)[i].category);
              mixdata.push(Object.values(val)[i]);
          }
          let categoryarray = categorydata;

          removeDuplicates(categoryarray);
          var sortedArray = categoryarray.sort(function (a, b) {
            if (a < b) return -1;
            else if (a > b) return 1;
            return 0;
          });
          setCategoryRand(categoryarray);
          
          let optionItems_category = categoryarray.map((data) =>
                        <MenuItem value={data}>{data}</MenuItem>
                    );
          setMix(mixdata);
          setOptionData(optionItems_category);
          let randmix = Math.floor(Math.random() * mixdata.length);
          setCategory(mixdata[randmix].category);
          setJoke(mixdata[randmix].category);
          setDescription(mixdata[randmix].joke);
          setLast(Object.keys(val)[Object.keys(val).length-1]);
          setLoading(false);
        })
        .catch(err => console.log(err));
    }
    next();
  }, []);
  
  function removeDuplicates(array) {
    array.splice(0, array.length, ...(new Set(array)))
  };
  
  const nextJoke = async () => {
    database
      .ref("/fun/EglaLkMAPaUkSeknqSaz")

      .limitToFirst(10)
      .once("value")
      .then(function(snapshot) {
        setLast(snapshot.key);
      })
      .catch(err => console.log(err));
  };

  const setValues = (value) => {
    if (mix.length === 0){
      refetch();
    }else{
      let valueArray = mix.filter(item => item.category === value);
      if (valueArray.length > 0) {
          let defaultValues = valueArray[Math.floor(Math.random() * valueArray.length)];
          const { joke = '' } = defaultValues;
          setDescription(joke);
          if(mix.findIndex(item=>item.joke === joke) !== -1){
            mix.splice(mix.findIndex(item=>item.joke === joke), 1);
            setMix(mix);
          }
      }else{
        setDescription('There is no data to show in this category. Please select another category.');
      }
    }
  }

  async function refetch(){
    //get next data
    console.log('refetch function');
    setOptionData('');
    setMix('');
    setCategory('');
    setDescription('');
    setJoke('');
    setCategoryRand('');
    setLoading(true);
    database
      .ref("/fun/EglaLkMAPaUkSeknqSaz")
      .orderByKey()
      .startAt(last)
      .limitToFirst(100)
      .on('value',function(snapshot) {
        let val = snapshot.val();
        let categorydata = [];
        let mixdata = [];    //[{'joke':'...', category:'...'},{...}]
        for (var i = 1 ; i < Object.values(val).length ; i ++) {
            categorydata.push(Object.values(val)[i].category);
            mixdata.push(Object.values(val)[i]);
        }
        let categoryarray = categorydata;

        removeDuplicates(categoryarray);
        var sortedArray = categoryarray.sort(function (a, b) {
          if (a < b) return -1;
          else if (a > b) return 1;
          return 0;
        });
        setCategoryRand(categoryarray);
        
        let optionItems_category = categoryarray.map((data) =>
                      <MenuItem value={data}>{data}</MenuItem>
                  );
        setMix(mixdata);
        setOptionData(optionItems_category);
        let randmix = Math.floor(Math.random() * mixdata.length);
        setCategory(mixdata[randmix].category);
        setJoke(mixdata[randmix].category);
        setDescription(mixdata[randmix].joke);
        setLast(Object.keys(val)[Object.keys(val).length-1]);
        setLoading(false);
      })

  }

  function randjoke(){  
    if(mix.length === 0){
        refetch();
    }else{
        let randmixa = Math.floor(Math.random() * categoryRand.length);
        setCategory(categoryRand[randmixa]);
        setJoke(categoryRand[randmixa]);
        let aa=mix.filter(item => item.category === categoryRand[randmixa]);
        if(aa.length === 0){
          setDescription('');
          if (categoryRand.findIndex(item=>item.category === categoryRand[randmixa]) !== -1){
            categoryRand.splice(categoryRand.findIndex(item=>item.category === categoryRand[randmixa]),1);
            setCategoryRand(categoryRand);
          }
        }else{
          let des = aa[Math.floor(Math.random() * aa.length)].joke;
          setDescription(des);
          if (mix.findIndex(item=>item.joke === des) !== -1){
            mix.splice(mix.findIndex(item=>item.joke === des),1);
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
                                        setValues(category);
                                        setJoke(category);

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
                                  onClick={()=>{refetch()}}
                                >
                                  Reset
                                </Button>
                                <Button
                                  onClick={()=>{setValues(joke)}}
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
