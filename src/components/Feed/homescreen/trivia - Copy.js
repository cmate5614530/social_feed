import React from "react";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Loading from "../../Shared/loading";
import axiosRetry from "axios-retry";

import {
  Typography,
  Card,
  CardHeader,
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
  const [age, setAge] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [err, setError] = React.useState(false);
  const [categoryList, setCategoryList] = React.useState("");
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  const [difficulty, setDifficulty] = React.useState("easy");
  const [question, setQuestion] = React.useState("");
  const [options, setOptions] = React.useState("");
  const [answer, setAnswer] = React.useState("");
  const [type, setType] = React.useState("multiple");
  const [token, setToken] = React.useState(false);
  const [showAnswer, setAnswerShow] = React.useState(false);
  React.useEffect(() => {
    // setLabelWidth(inputLabel.current.offsetWidth);
    const getCategory = () => {
      return axios
        .get("https://opentdb.com/api_category.php")
        .then(res => {
          setCategoryList(res.data.trivia_categories);

          setCategory(res.data.trivia_categories[0].id);

          return res.data.trivia_categories[0].id;
        })
        .then(id => {
          let optionss = {
            method:'GET',
            url:`https://opentdb.com/api.php?amount=1&category=${id}&difficulty=${difficulty}&type=${type}&encode=url3986`,
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            }
          };
          return axios(optionss);
        })
        .then(res => {
          let data = res.data.results[0];

          setQuestion(data.question);
          setAnswer(data.correct_answer);
          setOptions([...data.incorrect_answers, data.correct_answer]);
          return true;
        })
        .catch(error => {
          return false;
        });
    };

    async function getCategoriesWithRetry() {
      try {
        setLoading(true);
        let isFetched = await getCategory();
        console.log("first ");
        if (isFetched) {
          setLoading(false);
          setError(false);
          console.log(1);
        } else {
          let isFetched = await getCategory();
          if (isFetched) {
            setLoading(false);
            setError(false);
            console.log(2);
          } else {
            let isFetched = await getCategory();
            if (isFetched) {
              setLoading(false);
              setError(false);
              console.log(3);
            } else {
              let isFetched = await getCategory();
              if (isFetched) {
                setLoading(false);
                setError(false);
                console.log(4);
              } else {
                let isFetched = await getCategory();
                if (isFetched) {
                  setLoading(false);
                  setError(false);
                  console.log(5);
                } else {
                  setLoading(false);
                  setError("An Error occurred");
                }
              }
            }
          }
        }
      } catch (err) {}
    }
    getCategoriesWithRetry();
  }, []);

  const handleCategoryChange = event => {
    setCategory(event.target.value);
    getNextQuestion();
  };

  const handleDifficultyChange = event => {
    setDifficulty(event.target.value);
    getNextQuestion();
  };
  const handleTypeChange = event => {
    setType(event.target.value);
    getNextQuestion();
  };

  const getNextQuestion = async () => {
    try {
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
      let optionss = {
        method:'GET',
        url:`https://opentdb.com/api.php?amount=1&token=${temptoken}&category=${category}&difficulty=${difficulty}&type=${type}&encode=url3986`,
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
      };
      let res = await axios(optionss);
      let data = res.data.results[0];

      setQuestion(data.question);
      setAnswer(data.correct_answer);
      setOptions([...data.incorrect_answers, data.correct_answer]);
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
            onChange={handleCategoryChange}
            labelWidth={labelWidth}
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
            onChange={handleDifficultyChange}
            labelWidth={labelWidth}
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
            onChange={handleTypeChange}
            labelWidth={labelWidth}
          >
            <MenuItem value={"multiple"}>Multiple Choice</MenuItem>
            <MenuItem value={"boolean"}>True / False</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item md={12} sm={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" style={{marginLeft:'6%'}}>{unescape(question)}</Typography>
            <div>
              <ul style={{ paddingTop: 0 }}>
                {type == "multiple" && Array.isArray(options)
                  ? options.map((item, index) => {
                      return (
                        <li key={index} style={{ padding: "8px" }}>
                          <Typography variant={"subtitle2"}>
                            <span>{index + 1})</span> {unescape(item)}
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
                  {unescape(answer)}
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
              {/* <Button
                size="small"
                style={{ marginRight: "8px" }}
                variant="outlined"
                color="primary"
                onClick={() => {
                  setType("multiple");
                  setDifficulty("easy");
                  setCategory(categoryList[0].id);
                }}
              >
                Reset
              </Button> */}
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
