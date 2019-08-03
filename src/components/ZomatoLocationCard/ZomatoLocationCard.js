import React from 'react';

import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Card,
  CardImg,
  CardText,
  CardHeader,
  Button,
} from 'reactstrap';

import locationData from '../../helpers/data/locationData';

import './ZomatoLocationCard.scss';

class ZomatoLocationCard extends React.Component {
  state = {
    duplicate: false,
    activeIndex: 0,
    photos: [],
  }

  // Start ZLoc Carousel
  next = this.next.bind(this);

  previous = this.previous.bind(this);

  goToIndex = this.goToIndex.bind(this);

  onExiting = this.onExiting.bind(this);

  onExited = this.onExited.bind(this);

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.state.photos.length - 1
      ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0
      ? this.state.photos.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }
  // End ZLoc Carousel

  // Pulling ZLoc photos into an array for each location
  getPhotos = () => {
    const { location } = this.props;
    const tempPhotos = [];
    const photoUrls = [];
    if (location.photos) {
      tempPhotos.push(location.photos);
    }
    tempPhotos.forEach((photoArray) => {
      photoArray.forEach((photoObj) => {
        photoUrls.push(photoObj.photo.url);
      });
    });
    this.setState({ photos: photoUrls });
  }

  // Adds ZLoc location to map and sets duplicate to true
  addToMap = () => {
    const {
      name,
      address,
      lat,
      lng,
      addZomatoLocation,
    } = this.props;
    addZomatoLocation(name, address, lat, lng);
    this.setState({ duplicate: true });
  }

  // checks for locations that are already on the map
  duplicateCheck = () => {
    const { currentLocations, address } = this.props;
    currentLocations.forEach((location) => {
      if (location.address === address) {
        this.setState({ duplicate: true });
      }
    });
  }

  componentDidMount() {
    this.duplicateCheck();
    this.getPhotos();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentLocations !== this.props.currentLocations) {
      // this.setState({ duplicate: false });
    }
  }

  render() {
    const { duplicate, activeIndex, photos } = this.state;
    const { name, address } = this.props;

    const seePhotos = photos.length === 0 ? (
      <img className="img-fluid carousel-photo" src="https://previews.123rf.com/images/pavelstasevich/pavelstasevich1811/pavelstasevich181101028/112815904-no-image-available-icon-flat-vector-illustration.jpg" alt="placeholder"></img>
    ) : null;

    const slides = photos.map(photo => <CarouselItem
      onExiting={this.onExiting} onExited={this.onExited} key={photo}>
            <img className="img-fluid carousel-photo" alt={photo.altText} src={photo} /></CarouselItem>);

    return (
      <div className="ZomatoLocationCard col-12 no-gutters">
        <Card body className="text-center">
          <CardHeader><h6>{name}</h6></CardHeader>
          <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}>
        <CarouselIndicators
        items={photos} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        {seePhotos}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
          <CardText>{address}</CardText>
          <Button className={duplicate ? 'btn btn-outline-success disabled' : 'btn btn-success'}
          onClick={duplicate ? null : this.addToMap}>{duplicate ? 'Added To Your Locations' : 'Add This Location!'}</Button>
        </Card>
      </div>
    );
  }
}

export default ZomatoLocationCard;
