import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import tempheader from "../../../../assets/header.png";
import avatar from "../../../../assets/avatar.jpeg";
import { Typography } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import Edit from "@material-ui/icons/Edit";
import Axios from "axios";
import { STATIC_URL, UPLOAD_URL } from "../../../../config/";
import csc from "country-state-city";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Error from "../../../Shared/Error";
import Loading from "../../../Shared/loading";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputBase from "@material-ui/core/InputBase";
import FormControl from "@material-ui/core/FormControl";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData
} from "react-country-region-selector";

function FormDialog({ classes, profile, email, handleClose, refetchQueries }) {
  const [open, setOpen] = React.useState(true);
  const [name, setName] = React.useState(profile.fullname);
  const [emailvalue, setEmail] = React.useState(email);
  const [city, setCity] = React.useState(profile.city);
  //const [state, setState] = React.useState(profile.state);
  /*   const [country, setCountry] = React.useState(profile.country) */
  const [occupation, setOccupation] = React.useState(profile.occupation);
  const [shortdescription, setDescription] = React.useState(
    profile.shortdescription
  );
  const [profilepic, setProfilePic] = React.useState(profile.profilePic);
  const [headerpic, setHeaderPic] = React.useState(profile.headerPic);
  const [headerpicChange, setHeaderPicChange] = React.useState(false);
  const [profilepicChange, setProfilePicChange] = React.useState(false);
  const [profilepicfile, setProfilePicFile] = React.useState("");
  const [headerpicfile, setHeaderPicFile] = React.useState("");
  const [statelist, setStateList] = React.useState(false);
  const [citylist, setCityList] = React.useState([]);
  const [age, setAge] = React.useState("");
  const [dataloading, setDataloading] = React.useState(true);
  const [country, setCountry] = React.useState(profile.country);
  const [region, setRegion] = React.useState(profile.state);
  const [countrydata, setCountrydata] = React.useState("");

  let headerRef = React.createRef();
  let profileRef = React.createRef();

  /*   const countries = csc.getAllCountries(); */

  const handleProfileUpdate = async updateProfile => {
    let tc = csc.getCountryById(country);

    let res = await updateProfile();

    handleClose();
  };

  const handleHeaderPicChange = e => {
    setHeaderPicChange(true);
    setHeaderPicFile(e.target.files[0]);
    let a = new Date().toString().split("(")[0];
    let b = a.split(" ");
    b.pop();
    b.pop();
    let picname = b.join("-") + e.target.files[0].name;

    setHeaderPic(picname);
    let data = new FormData();
    data.append("token", localStorage.getItem("authtoken"));
    data.append("name", picname);
    data.append("file", e.target.files[0]);
    Axios.post(UPLOAD_URL, data);
  };

  const handleProfilePicChange = e => {
    setProfilePicChange(true);
    setProfilePicFile(e.target.files[0]);
    let a = new Date().toString().split("(")[0];
    let b = a.split(" ");
    b.pop();
    b.pop();
    let picname = b.join("-") + e.target.files[0].name;

    setProfilePic(picname);
    let data = new FormData();
    data.append("token", localStorage.getItem("authtoken"));
    data.append("file", e.target.files[0]);
    data.append("name", picname);
    Axios.post(UPLOAD_URL, data);
  };

  React.useEffect(() => {
    Axios.get("https://api.buzzraker.com/countrydata").then(res => {
      setCountrydata(res.data);

      setDataloading(false);
      if (profile.country != "" || profile.country != " ") {
        res.data.map(item => {
          if (item.countryName == profile.country) {
            let statelist = item.regions;
            setStateList(statelist);
          }
        });
      }
    });
  }, []);
  /* const handleChange = e => {
    setCountry(e.target.value);
    countries.map(item => {
      if (item.name == e.target.value) {
        let statelist = csc.getStatesOfCountry(item.id);
        setStateList(statelist);
      }
    });
  };
  const handleStateChange = e => {
    setState(e.target.value);
    statelist.map(item => {
      if (item.name == e.target.value) {
        let citylist = csc.getCitiesOfState(item.id);
        setCityList(citylist);
      }
    });
  }; */

  /* const handleCityChange = e => {
    setCity(e.target.value);
  }; */
  if (dataloading) {
    return <Loading />;
  } else {
    return (
      <Mutation
        mutation={UPDATE_PROFILE_MUTATION}
        variables={{
          name,
          email: emailvalue,
          city,
          state: region,
          country,
          occupation,
          profilepic: profilepic,
          headerpic: headerpic,
          shortdescription: shortdescription
        }}
        refetchQueries={refetchQueries}
      >
        {(updateProfile, { loading, error, called, client }) => {
          if (error) return <Error error={error} />;
          if (loading) return <Loading />;
          return (
            <div>
              <Dialog
                open={open}
                onClose={handleClose}
                scroll="paper"
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent dividers="paper">
                  <div
                    style={{ position: "relative" }}
                    className={classes.headerbox}
                  >
                    {headerpicChange == true ? (
                      <img
                        className={classes.headerimage}
                        src={URL.createObjectURL(headerpicfile)}
                      />
                    ) : headerpic == "header.png" ? (
                      <div
                        style={{ background: "#E7625F" }}
                        className={classes.headerimage}
                      />
                    ) : (
                      <img
                        className={classes.headerimage}
                        src={`${STATIC_URL}${profile.headerPic}`}
                      />
                    )}

                    <div
                      style={{
                        position: "absolute",
                        bottom: "10%",
                        right: "5%"
                      }}
                    >
                      <Edit
                        onClick={() => headerRef.click()}
                        style={{ color: "indigo" }}
                      />
                    </div>
                  </div>
                  <div className={classes.avatarbox}>
                    <Typography
                      className={classes.headertext}
                      variant="h5"
                      color="textSecondary"
                      component="h5"
                    >
                      Profile Pic
                    </Typography>
                    <div
                      style={{
                        position: "relative",
                        display: "flex",
                        justifyContent: "flex-end"
                      }}
                    >
                      {profilepicChange ? (
                        <img
                          style={{ height: "50px", width: "50px" }}
                          className={classes.avatarimage}
                          src={URL.createObjectURL(profilepicfile)}
                        />
                      ) : (
                        <img
                          style={{ height: "50px", width: "50px" }}
                          className={classes.avatarimage}
                          src={`${STATIC_URL}${profile.profilePic}`}
                        />
                      )}

                      <div
                        style={{
                          position: "absolute",
                          bottom: "10%",
                          right: "10%"
                        }}
                      >
                        <Edit
                          onClick={() => profileRef.click()}
                          style={{ color: "indigo" }}
                        />
                      </div>
                    </div>
                  </div>

                  <input
                    ref={input => (headerRef = input)}
                    onChange={handleHeaderPicChange}
                    type="file"
                    style={{ display: "none" }}
                  />
                  <input
                    ref={input => (profileRef = input)}
                    onChange={handleProfilePicChange}
                    type="file"
                    style={{ display: "none" }}
                  />
                  <TextField
                    id="outlined-name"
                    label="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                  />

                  <TextField
                    id="outlined-name"
                    label="Email"
                    value={emailvalue}
                    onChange={e => setEmail(e.target.value)}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                  />
                  {/*              <GooglePlacesAutocomplete
      onSelect={console.log}
    /> */}
                  {/*   <FormControl className={classes.margin}>
                  <InputLabel htmlFor="age-customized-select">Age</InputLabel>

                  <CountryDropdown
                    value={country}
                    onChange={val => setCountry(val)}
                  />
                </FormControl>
                <RegionDropdown
                  country={country}
                  value={region}
                  onChange={val => setRegion(val)}
                /> */}

                  <Select
                    value={country}
                    onChange={e => {
                      setCountry(e.target.value);
                      countrydata.map(item => {
                        if (item.countryName == e.target.value) {
                          let statelist = item.regions;
                          setStateList(statelist);
                        }
                      });
                    }}
                    input={
                      <TextField
                        id="country"
                        label="Country"
                        value={country}
                        margin="normal"
                        variant="outlined"
                        fullWidth
                      />
                    }
                  >
                    {countrydata.map(item => {
                      return (
                        <MenuItem key={item.id} value={item.countryName}>
                          {item.countryName}
                        </MenuItem>
                      );
                    })}
                  </Select>

                  {/*   <Select
                  value={country}
                  onChange={e => {
                    countries.map(item => {
                      if (item.id == e.target.value) {
                        setCountry(item.name)
                        alert(item.name)
                        let statelist = csc.getStatesOfCountry(e.target.value)
                        setStateList(statelist)
                      }
                    })
                  }}
                  input={<OutlinedInput name='age' id='outlined-age-simple' />}
                >
                  {countries.map(item => {
                    return <MenuItem value={item.id}>{item.name}</MenuItem>
                  })}
                </Select> */}

                  <Select
                    value={region}
                    onChange={e => setRegion(e.target.value)}
                    input={
                      <TextField
                        id="state"
                        label="State"
                        value={region}
                        margin="normal"
                        variant="outlined"
                        fullWidth
                      />
                    }
                  >
                    {statelist != false ? (
                      statelist.map(item => {
                        return (
                          <MenuItem key={item.id} value={item.name}>
                            {item.name}
                          </MenuItem>
                        );
                      })
                    ) : (
                      <MenuItem value={false}>Select Country First</MenuItem>
                    )}
                  </Select>

                  <TextField
                    id="outlined-name"
                    label="City"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                  />

                  <TextField
                    id="outlined-name"
                    label="Occupation"
                    value={occupation}
                    onChange={e => setOccupation(e.target.value)}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                  />

                  <TextField
                    id="outlined-name"
                    label="Short Description"
                    value={shortdescription}
                    onChange={e => setDescription(e.target.value)}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button
                    onClick={() => handleProfileUpdate(updateProfile)}
                    color="primary"
                  >
                    Subscribe
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

const UPDATE_PROFILE_MUTATION = gql`
  mutation(
    $name: String!
    $email: String!
    $city: String!
    $state: String!
    $country: String!
    $shortdescription: String!
    $occupation: String!
    $profilepic: String!
    $headerpic: String!
  ) {
    updateProfile(
      fullname: $name
      email: $email
      city: $city
      state: $state
      country: $country
      occupation: $occupation
      shortdescription: $shortdescription
      profilepic: $profilepic
      headerpic: $headerpic
    ) {
      profile {
        id
        user {
          email
        }
      }
    }
  }
`;

const styles = theme => ({
  headerbox: {
    position: "relative"
  },
  headerimage: {
    width: "100%",
    height: "12em"
  },
  avatarbox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "10px",
    border: "1px solid indigo",
    padding: "10px"
  },
  avatarimage: {
    width: "30%",
    borderRadius: "50%",
    opacity: 0.5
  },
  headertext: {
    textAlign: "right"
  },
  textField: {}
});

export default withStyles(styles)(FormDialog);

const BootstrapInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  }
}))(InputBase);
