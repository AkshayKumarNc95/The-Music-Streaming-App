import React from "react";
import { Grid, Image, Button, Card , Icon} from "semantic-ui-react";
import './CustomGrid.scss';

const GridExampleRelaxed = props => {
  const { onClick } = props;
  let dataArray = props.dataArray
    ? props.dataArray
    : [];
  let columns = props.columns ? props.columns : 5;
  const imageSrc = "/bright-clouds-color-1470589.jpg";
  console.log(columns);
  return (
    <Grid relaxed columns={columns}>
      {dataArray.length>0 ? dataArray.map(ele => (
        <Grid.Column key={ele.id}>
          {/* <Button onClick= {onClickHandlers}>
            <Image src={ele.imageSrc} />
          </Button> */}
          <a onClick = {()=>onClick(ele.id)}>
          <Card fluid>
            <img src={ele.image? ele.image: imageSrc} className = "card-image" height = "180" align = "middle"/>
            <Card.Content >
              <Card.Header >
                <span id="card-header-span">
                {ele.name}
                </span>
                </Card.Header>
            </Card.Content>
          </Card>
          </a>
        </Grid.Column>
      )):showLoader(true)}
       {showLoader(props.loading)}
    </Grid>
  );
};

function showLoader(show = false) {
  if (!show) {
    return;
  }
  return (
    <div id="loading-bar-gen-grid">
      <Icon id="loading-ico" loading name="asterisk" />
    </div>
  );
}

export default GridExampleRelaxed;
