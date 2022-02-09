import React from "react";
import Carousel from "react-material-ui-carousel";
import autoBind from "auto-bind";
import "../Slider/Slider.css";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from "@material-ui/core";

function Banner(props) {
  if (props.newProp) console.log(props.newProp);
  const contentPosition = props.contentPosition
    ? props.contentPosition
    : "left";
  const totalItems = props.length ? props.length : 2;
  const mediaLength = totalItems - 1;

  let items = [];
  const content = (
    <Grid item xs={12 / totalItems} key="content">
      <CardContent className="Content">
        <Typography className="Title">{props.item.Name}</Typography>

        <Typography className="Caption">{props.item.Caption}</Typography>
      </CardContent>
    </Grid>
  );

  for (let i = 0; i < mediaLength; i++) {
    const item = props.item.Items[i];

    const media = (
      <Grid item xs={12 / totalItems} key={item.Name}>
        <CardMedia className="Media" image={item.Image} title={item.Name}>
          <Typography className="MediaCaption">{item.Name}</Typography>
        </CardMedia>
      </Grid>
    );

    items.push(media);
  }

  if (contentPosition === "left") {
    items.unshift(content);
  } else if (contentPosition === "right") {
    items.push(content);
  } else if (contentPosition === "middle") {
    items.splice(items.length / 2, 0, content);
  }

  return (
    <Card raised className="Banner">
      <Grid container spacing={0} className="BannerGrid">
        {items}
      </Grid>
    </Card>
  );
}

const items = [
  {
    Name: "Nike",
    Caption: "Хорошие кроссы купи родной",
    Image:
      "https://sneakerhead.ru/images/news/400310/tild6238-6639-4739-a538-653064363632__95c1bf98-d6cf-45e2-b.jpeg",
    contentPosition: "left",
    Items: [
      {
        Image:
          "https://sneakerhead.ru/images/news/400310/tild6238-6639-4739-a538-653064363632__95c1bf98-d6cf-45e2-b.jpeg",
      },
      {
        Image:
          "https://sneakerhead.ru/images/news/400310/tild6238-6639-4739-a538-653064363632__95c1bf98-d6cf-45e2-b.jpeg",
      },
    ],
  },
  {
    Name: "Adidas",
    Caption: "  Adidas adidas Superstar Shoes - Black | adidas US",
    contentPosition: "middle",
    Items: [
      {
        Image:
          "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/15f901c90a9549d29104aae700d27efb_9366/Superstar_Shoes_Black_EG4959_01_standard.jpg",
      },
      {
        Image:
          "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/15f901c90a9549d29104aae700d27efb_9366/Superstar_Shoes_Black_EG4959_01_standard.jpg",
      },
    ],
  },
  {
    Name: "Adidas",
    Caption: "adidas Running by Runtastic ",
    contentPosition: "right",
    Items: [
      {
        Image:
          "https://www.runningxpert.com/media/mageplaza/blog/post/a/d/adidas_top.jpg",
      },
      {
        Image:
          "https://avatars.mds.yandex.net/get-zen_doc/1931555/pub_5eb278697196c61aab11b0ee_5eb27ae45d462a32492c44bd/scale_1200",
      },
    ],
  },
  {
    Name: "Nike",
    Caption: " Nike SNEAKRS",
    Items: [
      {
        Image:
          "https://play-lh.googleusercontent.com/WkDk_akVcKIkgJvlC4xUDokkvQAZFcSPqO5gfrJFDIzwx3CkR4YhUlsE4mtvyWfYB14=w412-h220-rw",
      },
      {
        Image:
          "https://play-lh.googleusercontent.com/WkDk_akVcKIkgJvlC4xUDokkvQAZFcSPqO5gfrJFDIzwx3CkR4YhUlsE4mtvyWfYB14=w412-h220-rw",
      },
    ],
  },
];

class SliderNavigate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      autoPlay: true,
      animation: "fade",
      indicators: true,
      timeout: 500,
      navButtonsAlwaysVisible: false,
      navButtonsAlwaysInvisible: false,
      cycleNavigation: true,
    };

    autoBind(this);
  }

  toggleAutoPlay() {
    this.setState({
      autoPlay: !this.state.autoPlay,
    });
  }

  toggleIndicators() {
    this.setState({
      indicators: !this.state.indicators,
    });
  }

  toggleNavButtonsAlwaysVisible() {
    this.setState({
      navButtonsAlwaysVisible: !this.state.navButtonsAlwaysVisible,
    });
  }

  toggleNavButtonsAlwaysInvisible() {
    this.setState({
      navButtonsAlwaysInvisible: !this.state.navButtonsAlwaysInvisible,
    });
  }

  toggleCycleNavigation() {
    this.setState({
      cycleNavigation: !this.state.cycleNavigation,
    });
  }

  changeAnimation(event) {
    this.setState({
      animation: event.target.value,
    });
  }

  changeTimeout(event, value) {
    this.setState({
      timeout: value,
    });
  }

  render() {
    return (
      <div style={{ marginTop: "-70px", color: "#494949" }}>
        <Carousel
          className="Example"
          autoPlay={this.state.autoPlay}
          animation={this.state.animation}
          indicators={this.state.indicators}
          timeout={this.state.timeout}
          cycleNavigation={this.state.cycleNavigation}
          navButtonsAlwaysVisible={this.state.navButtonsAlwaysVisible}
          navButtonsAlwaysInvisible={this.state.navButtonsAlwaysInvisible}
        >
          {items.map((item, index) => {
            return (
              <Banner
                item={item}
                key={index}
                contentPosition={item.contentPosition}
              />
            );
          })}
        </Carousel>
      </div>
    );
  }
}

export default SliderNavigate;
