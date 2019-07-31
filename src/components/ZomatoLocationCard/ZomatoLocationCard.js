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

  getPhotos = () => {
    const { location } = this.props;
    const tempPhotos = [];
    const photoUrls = [];
    if (location.photos) {
      // console.error('location photos', location.photos);
      tempPhotos.push(location.photos);
    }
    tempPhotos.forEach((photoArray) => {
      photoArray.forEach((photoObj) => {
        photoUrls.push(photoObj.photo.url);
      });
    });
    this.setState({ photos: photoUrls });
  }

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

  duplicateCheck = () => {
    const { currentLocations, address } = this.props;
    currentLocations.forEach((location) => {
      if (location.address === address) {
        this.setState({ duplicate: true });
      }
    });
  }

  photoCheck = () => {
    const { filterPhotos, location } = this.props;
    filterPhotos(location);
  }

  componentDidMount() {
    this.duplicateCheck();
    this.getPhotos();
  }

  render() {
    const { duplicate, activeIndex, photos } = this.state;
    const { name, address } = this.props;

    const slides = photos.map(photo => <CarouselItem
      onExiting={this.onExiting} onExited={this.onExited} key={photo}>
            <img className="img-fluid carousel-photo" alt={photo.altText} src={photo} /></CarouselItem>);

    return (
      <div className="ZomatoLocationCard col-6 no-gutters">
        <Card body className="text-center">
          <CardHeader><h6>{name}</h6></CardHeader>
          <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}>
        <CarouselIndicators
        items={photos} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
          <CardText>{address}</CardText>
          <Button className={duplicate ? 'btn btn-outline-success disabled' : 'btn btn-success'} onClick={this.addToMap}>{duplicate ? 'Added To Your Locations' : 'Add This Location!'}</Button>
        </Card>
      </div>
    );
  }
}

export default ZomatoLocationCard;
