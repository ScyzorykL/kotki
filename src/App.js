import React, {useState, useEffect} from 'react';
import {Box, FormControl, FormControlLabel, RadioGroup, TextField} from "@mui/material";
import Grid from "@mui/material/Grid";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import './App.css';

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A202' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(4),
    margin: '0, 40px',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '500px',
}));

export default function App() {
    const [cat, setCat] = useState({});
    const [img, setImg] = useState({});
    const [radio, setRadio] = useState({});
    const [loading, setLoading] = useState(false);
    const [errorStatus, setErrorStatus] = useState(null);

    const handleChange = e => {
        const target = e.target;
        if(target.checked){
            setRadio(target.value)
        }
    }

    useEffect(() => {
        const imageUrl = 'https://cataas.com/cat/says/' + cat;
        const waitTime = 2000;
        const fetchImage = async () => {
            const res = await fetch(imageUrl);
            if(res.status < 200 || res.status >= 300) {
                setErrorStatus(res.status);
            }
            const imageBlob = await res.blob();
            const imageObjectURL = URL.createObjectURL(imageBlob);
            setImg(imageObjectURL);
            setLoading(false);
        }
        if(cat !== '') {
            setLoading(true);
            setImg(null);
            setErrorStatus(null);
        }
        const catTimer = setTimeout(() => fetchImage(), waitTime);
    }, [cat, radio])

  return(
      <Box className="child">
        <Grid container spacing={2}>
          <Grid size={6} className="ytem">
            <Item>
                <FormControl noValidate autoComplete='off'>
                    <TextField
                        placeholder='Add cat name'
                        type="text"
                        id="cat"
                        name="cat"
                        onChange={(e) => setCat(e.target.value)}/>

                    <RadioGroup name='radio-buttons-group'>
                        <FormControlLabel value="green" control={<Radio/>} onChange={handleChange} label="Green"/>
                        <FormControlLabel value="blue" control={<Radio/>} onChange={handleChange} label="Blue"/>
                        <FormControlLabel value="red" control={<Radio/>} onChange={handleChange} label="Red"/>
                    </RadioGroup>
                </FormControl>
                {
                    !cat && <h1 style={{ marginTop: '2em'}}>Use form to generate a cat</h1>
                }
            </Item>
          </Grid>
          <Grid size={6} className="ytem">
            <Item>
                {
                    loading && <h1>Loading...</h1>
                }
                {
                    errorStatus && <h1>Cat could not be generated</h1>
                }
                <img src={img} alt="cat"/>
            </Item>
          </Grid>
        </Grid>
      </Box>
  )
}