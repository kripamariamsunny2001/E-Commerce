import * as React from "react";
import { useEffect, useState } from "react";
import Card from "@mui/joy/Card";
import axios from "axios";
import IconButton from "@mui/joy/IconButton";
import ImageList from "@mui/material/ImageList";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import AspectRatio from "@mui/joy/AspectRatio";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Container from "@mui/material/Container";
import Autocomplete from "@mui/material/Autocomplete";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SortIcon from "@mui/icons-material/Sort";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { Button } from "@mui/material";
import { TextField } from "@material-ui/core";

const Home = () => {
  const [product, setProductList] = useState([{}]);
  const [selectedName, setSelected] = useState([]);
  const [minAmount, setMinAmount] = useState<number>(0);
  const [maxAmount, setMaxAmount] = useState<number>(0);
  const [filterStatus, setFilterStatus] = React.useState(false);
  const [sortStatus, setSortStatus] = React.useState(false);
  let [sortAmount, setSortAmount] = useState<number>(0);

  //fetch to list products, filter prodcts using name , minimum amount and maximum amount

  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:8000/reviews/product/?productName=${selectedName}&minAmount=${minAmount}&maxAmount=${maxAmount}&sortAmount=${sortAmount}`
      )

      .then((res) => {
        console.log(res.data);
        setProductList(res.data);
      });
  }, [selectedName, maxAmount, minAmount, sortAmount]);

  const handleSort = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSortAmount((sortAmount = 1));
  };
  const changeSort = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSortAmount((sortAmount = -1));
  };

  const handleChange = (value: any) => {
    if (value != null) {
      setSelected(value);
    } else {
      setSelected([]);
    }
  };

  return (
    <div>
      <IconButton
        onClick={() => {
          setFilterStatus(!filterStatus);
        }}
      >
        <FilterAltIcon />
      </IconButton>

      {filterStatus && (
        <Container>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={product.map((item: any) => item.productName)}
            onChange={(event, value) => handleChange(value)}
            sx={{ width: 200 }}
            renderInput={(params) => (
              <TextField {...params} label="Filter By Name" />
            )}
          />

          <TextField
            type="number"
            label="Min"
            value={minAmount}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setMinAmount(Number(event.target.value))
            }
          />
          <TextField
            type="number"
            label="Max"
            value={maxAmount}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setMaxAmount(Number(event.target.value))
            }
          />

          <Button>Apply Filter</Button>
        </Container>
      )}

      <IconButton
        onClick={() => {
          setSortStatus(!sortStatus);
        }}
      >
        <SortIcon />
      </IconButton>

      {sortStatus && (
        <Container>
          <Button variant="outlined" onClick={handleSort}>
            Minimum to Maximum
          </Button>
          
          <Button variant="outlined" onClick={changeSort}>
            Maximum to Minimum
          </Button>
        </Container>
      )}
      <ImageList>
        {product.map((item: any) => (
          <Card key={item.img}>
            <AspectRatio>
              <img
                src={item.productImage}
                srcSet={item.productImage}
                alt={item.title}
                loading="lazy"
              />
            </AspectRatio>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.productName}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                {item.amount}
              </Typography>
              <CardActions>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShoppingCartIcon />
                  </IconButton>
                </CardActions>
              </CardActions>
            </CardContent>
          </Card>
        ))}
      </ImageList>
    </div>
  );
};
export default Home;