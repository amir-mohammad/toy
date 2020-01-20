import React, { useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Container } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Editor } from "@tinymce/tinymce-react";
import { DropzoneArea } from "material-ui-dropzone";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import axios from "axios";
import NumberFormat from "react-number-format";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Form } from "semantic-ui-react";
import Divider from '@material-ui/core/Divider';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import {
  fade,
  ThemeProvider,
  withStyles,

  createMuiTheme,
} from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';



const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: "5rem"
  },
  paper: {
    padding: "2rem"
  },
  buttonSpacing: {
    marginLeft: "10px"
  },
  alignItems: {
    textAlign: "right"
  }
}));

const Addproduct = () => {
  const classes = useStyles();
  const [taxCheck, setTaxCheck] = useState(true);
  const [selling, setSelling] = useState(true);
  const [editor, setEditor] = useState("");
  const [files, setFiles] = useState([]);
  const handleEditorChange = e => {
    setEditor(e.target.getContent());
  };
  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", files[0]);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };

    const res = await axios.post(
      "http://localhost:4000/upload/",
      formData,
      config
    );
    console.log(res.data);
  };

  const changeHandler = files => {
    setFiles(files);
    console.log(files);
  };

  const handleChange = e => {
    setTaxCheck(!taxCheck);
  };
  const sellhandleChange = e => {
    setSelling(!selling);
  };


  const BootstrapInput = withStyles(theme => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.common.white,
      border: '1px solid #ced4da',
      fontSize: 16,
      width: 'auto',
      padding: '10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }))(InputBase);


  return (
    <main className={classes.content}>
      {console.log(files)}
      <Container maxWidth={"md"}>
        <form style={{ width: "100%" }} onSubmit={onSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <h2>Add Product</h2>
            </Grid>
            <Grid item xs={4} className={classes.alignItems}>
              <Button variant="contained">Discard</Button>
              <Button
                variant="contained"
                type="submit"
                color="primary"
                className={classes.buttonSpacing}
              >
                Save
              </Button>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={8}>
              <Paper elevation={3} className={classes.paper}>
                <h3>Product title</h3>
                <TextField
                  id="title"
                  label="Product Title"
                  variant="outlined"
                  style={{ width: "100%", marginBottom: "2rem" }}
                />
                <h3>Product description</h3>
                <Editor
                  value={editor}
                  init={{
                    height: "300",
                    menubar: false,
                    plugins: [
                      "advlist autolink lists link image charmap print preview anchor",
                      "searchreplace visualblocks code fullscreen",
                      "insertdatetime media table paste code help wordcount",
                      "directionality"
                    ],
                    toolbar:
                      "undo redo | formatselect | bold italic backcolor | \
                              alignleft aligncenter alignright alignjustify | \
                              bullist numlist outdent indent | removeformat | help |  ltr rtl",
                    skin: window.matchMedia("(prefers-color-scheme: dark)")
                      .matches
                      ? "oxide-dark"
                      : "",
                    content_css: window.matchMedia(
                      "(prefers-color-scheme: dark)"
                    ).matches
                      ? "dark"
                      : ""
                  }}
                  onChange={handleEditorChange}
                />
              </Paper>
              <Paper
                elevation={3}
                className={classes.paper}
                style={{ marginTop: "2rem" }}
              >
                <h3>Product Image</h3>
                <DropzoneArea onChange={changeHandler} />
              </Paper>
              <Paper
                elevation={3}
                className={classes.paper}
                style={{ marginTop: "2rem" }}
              >
                <h3>Pricing</h3>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <NumberFormat
                      thousandSeparator={true}
                      prefix={" تومان "}
                      style={{ width: "100%", padding: "10px" }}
                      placeholder="Original Price"
                      name="originalPrice"
                    />
                    <FormControlLabel
                      style={{ marginTop: "20px" }}
                      control={
                        <Checkbox
                          checked={taxCheck}
                          onChange={handleChange}
                          name="tax"
                          color="primary"
                        />
                      }
                      label="Charge Tax on This Project"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <NumberFormat
                      thousandSeparator={true}
                      prefix={" تومان "}
                      style={{ width: "100%", padding: "10px" }}
                      placeholder="Offer Price"
                      name="offerPrice"
                    />
                  </Grid>
                </Grid>
              </Paper>
              <Paper
                elevation={3}
                className={classes.paper}
                style={{ marginTop: "2rem" }}
              >
                <h3>Inventory</h3>
                <Form style={{ width: "100%", paddingTop: "20px" }}>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Form.Input
                        fluid
                        label="Sku"
                        placeholder="SKU(Stock Keeping Unit)"
                      />

                      <FormControlLabel
                        style={{ marginTop: "20px" }}
                        control={
                          <Checkbox
                            checked={selling}
                            onChange={sellhandleChange}
                            name="tax"
                            color="primary"
                          />
                        }
                        label="Continue selling when out of stock"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Form.Input
                        fluid
                        label="Barcode "
                        placeholder="Barcode"
                      />
                    </Grid>
                  </Grid>
                </Form>
                <Divider/>
                <h3>Quantity</h3>
                <FormControl className={classes.margin} >
        <InputLabel shrink htmlFor="bootstrap-input">
          Quantity
        </InputLabel>
        <BootstrapInput defaultValue="0" id="bootstrap-input" type="Number" style={{width:"800px"}}  />
      </FormControl>
              </Paper>

              <Paper
                elevation={3}
                className={classes.paper}
                style={{ marginTop: "2rem" }}
              >
                <h3>Shipping</h3>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>xs = 3</Paper>
            </Grid>
          </Grid>
        </form>
      </Container>
    </main>
  );
};

export default Addproduct;
