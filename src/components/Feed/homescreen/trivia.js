import React from "react";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Loading from "../../Shared/loading";

import {
  Typography,
  Card,
  CardContent,
  Button,
  CardActions
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function Trivia(props) {
  const classes = useStyles();
  const [category, setCategory] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [err, setError] = React.useState(false);
  const [categoryList, setCategoryList] = React.useState("");
  const inputLabel = React.useRef(null);
  const [difficulty, setDifficulty] = React.useState("easy");
  const [question, setQuestion] = React.useState("");
  const [options, setOptions] = React.useState("");
  const [answer, setAnswer] = React.useState("");
  const [type, setType] = React.useState("multiple");
  const [token, setToken] = React.useState(false);
  const [showAnswer, setAnswerShow] = React.useState(false);
  React.useEffect(() => {
    getCategory();
  }, []);

  //get category
  async function getCategory(){
    let cate = await axios.get("https://opentdb.com/api_category.php");
    let unsorted_array = cate.data.trivia_categories;
    var sortedArray = unsorted_array.sort(function (a, b) {
      if (a.name < b.name) return -1;
      else if (a.name > b.name) return 1;
      return 0;
    });
    setCategoryList(sortedArray);
    setCategory(cate.data.trivia_categories[0].id);
    
    let data = {};
    let ques = '';
    let incoans = [];
    do{
      let res = await axios.get(`https://opentdb.com/api.php?amount=1&category=${cate.data.trivia_categories[0].id}&difficulty=${difficulty}&type=${type}&encode=base64`)
      data = res.data.results[0];
      ques = atob(data.question);
      let incoans_array = [...data.incorrect_answers, data.correct_answer];
      incoans = incoans_array.map(item=>atob(item));
    }
    while(findBrokenString(ques)===true || findBrokenStringArray(incoans)===true);

    setQuestion(data.question);
    setAnswer(data.correct_answer);
    let opt = [...data.incorrect_answers, data.correct_answer];
    shuffle(opt);
    setOptions(opt);
    setLoading(false);
  }

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  async function getNextQuestion(){
    try {
      setLoading(true);
      //console.log(type);
      let temptoken = "";
      if (!token) {
        let res = await axios.get(
          "https://opentdb.com/api_token.php?command=request"
        );
        setToken(res.data.token);
        temptoken = res.data.token;
      } else {
        temptoken = token;
      }
      let data = {};
      let ques = '';
      let incoans = [];
      do{
        let res = await axios.get(`https://opentdb.com/api.php?amount=1&token=${temptoken}&category=${category}&difficulty=${difficulty}&type=${type}&encode=base64`);
        data = res.data.results[0];
  
        ques = atob(data.question);
        let incoans_array = [...data.incorrect_answers, data.correct_answer];
        incoans = incoans_array.map(item=>atob(item));
        //console.log(ques);
        //console.log(incoans);
      }
      while(findBrokenString(ques)===true || findBrokenStringArray(incoans)===true);

      setQuestion(data.question);
      setAnswer(data.correct_answer);
      let opt = [...data.incorrect_answers, data.correct_answer];
      shuffle(opt);
      setOptions(opt);
      setLoading(false);
      return true;
    } catch (error) {
      return false;
    }
  };
  function findBrokenString(input) {
    for (var i=0; i<input.length; i++) {
        if (input.charCodeAt(i) > 127) {
            console.log("found a broken character.")
            return true;
        }
    }
    return false;
  }
  function findBrokenStringArray(input) {
    for(var k = 0; k < input.length; k ++){
      for (var i=0; i<input[k].length; i++) {
        if (input[k].charCodeAt(i) > 127) {
            return true;
        }
      }
    }
    return false;
  }
  async function getQuestion(cate,diff,ty){
    setAnswerShow(false);
    try {
      setLoading(true);
      let data = {};
      let ques = '';
      let incoans = [];
      do{
        let res = await axios.get(`https://opentdb.com/api.php?amount=1&category=${cate}&difficulty=${diff}&type=${ty}&encode=base64`);
        data = res.data.results[0];
  
        ques = atob(data.question);
        let incoans_array = [...data.incorrect_answers, data.correct_answer];
        incoans = incoans_array.map(item=>atob(item));
        //console.log(ques);
        //console.log(incoans);
      }
      while(findBrokenString(ques)===true || findBrokenStringArray(incoans)===true);

      setQuestion(data.question);
      setAnswer(data.correct_answer);
      let opt = [...data.incorrect_answers, data.correct_answer];
      shuffle(opt);
      setOptions(opt);
      setLoading(false);
      return true;
    } catch (error) {
      return false;
    }
  };
  const GetQuestionWithRetry = async () => {
    setAnswerShow(false);
    try {
      setLoading(true);
      let isFetched = await getNextQuestion();
      if (isFetched) {
        setLoading(false);
        setError(false);
      } else {
        let isFetched = await getNextQuestion();
        if (isFetched) {
          setLoading(false);
          setError(false);
        } else {
          let isFetched = await getNextQuestion();
          if (isFetched) {
            setLoading(false);
            setError(false);
          } else {
            let isFetched = await getNextQuestion();
            if (isFetched) {
              setLoading(false);
              setError(false);
            } else {
              let isFetched = await getNextQuestion();
              if (isFetched) {
                setLoading(false);
                setError(false);
              } else {
                setLoading(false);
                setError("An error occured");
              }
            }
          }
        }
      }
    } catch (err) {}
  };

  if (loading) return <Loading />;
  if (err) return <p>{JSON.stringify(err)}</p>;
  console.log("errr", err);
  return (
    <Grid container>
      <Grid item xs={12} style={{textAlign:'center',width:'285px'}}>
        <FormControl className={classes.formControl}>
          <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
            Category
          </InputLabel>
          <Select
            style={{textAlign:'left'}}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={category}
            onChange={(e)=>{
              setCategory(e.target.value);
              getQuestion(e.target.value, difficulty,type);
              //handleCategoryChange();
            }}
          >
            {Array.isArray(categoryList) &&
              categoryList.map(item => {
                return <MenuItem value={item.id}>{item.name}</MenuItem>;
              })}
          </Select>
        </FormControl>
      </Grid>
      <Grid xs={12} style={{textAlign:'center'}}>
        <FormControl className={classes.formControl}>
          <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
            Difficulty
          </InputLabel>
          <Select
            style={{textAlign:'left',width:'85px'}}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={difficulty}
            onChange={(e)=>{
              setDifficulty(e.target.value);
              getQuestion(category,e.target.value,type);
              //handleDifficultyChange();
            }}
          >
            <MenuItem value={"easy"}>Easy</MenuItem>
            <MenuItem value={"medium"}>Medium</MenuItem>
            <MenuItem value={"hard"}>Hard</MenuItem>
          </Select>
        </FormControl>
     
        <FormControl className={classes.formControl}>
          <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
            Type
          </InputLabel>
          <Select
            style={{textAlign:'left',width:'139px'}}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={type}
            onChange={(e)=>{
              setType(e.target.value);
              getQuestion(category,difficulty,e.target.value);
              //handleTypeChange();
            }}
            
          >
            <MenuItem value={"multiple"}>Multiple Choice</MenuItem>
            <MenuItem value={"boolean"}>True / False</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item md={12} sm={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" style={{marginLeft:'6%'}}>{atob(question)}</Typography>
            <div>
              <ul style={{ paddingTop: 0 }}>
                {type === "multiple" && Array.isArray(options)
                  ? options.map((item, index) => {
                      return (
                        <li key={index} style={{ padding: "8px" }}>
                          <Typography variant={"subtitle2"}>
                            <span>{index + 1})</span> {atob(item)}
                          </Typography>
                        </li>
                      );
                    })
                  : null}
              </ul>
            </div>
            <div style={{ textAlign: "center", marginTop: "16px" }}>
              <Button
                onClick={() => setAnswerShow(!showAnswer)}
                size="small"
                variant="contained"
                color="primary"
              >
                Check Answer
              </Button>
              {showAnswer && (
                <Typography
                  style={{
                    marginTop: "8px",
                    textAlign: "left",
                    background: "#ddd",
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center"
                  }}
                  variant={"subtitle1"}
                >
                  {atob(answer)}
                </Typography>
              )}
            </div>
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
                onClick={() => {
                  setType("multiple");
                  setDifficulty("easy");
                  setCategory(categoryList[0].id);
                  getQuestion(categoryList[0].id,"easy","multiple");
                }}
              >
                Reset
              </Button>
              <Button
                onClick={GetQuestionWithRetry}
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
    </Grid>
  );
}
