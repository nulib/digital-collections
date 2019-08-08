import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Swiper from 'swiper/dist/js/swiper.js';
import 'swiper/dist/css/swiper.css';
import $ from 'jquery';
import CarouselItem from './CarouselItem';

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.initializeSwiper = this.initializeSwiper.bind(this);
  }

  // Dynamic carousels added by keyword may already have their items data filled when they enter here.
  componentDidMount() {
    if (this.props.items.length > 0) {
      this.initializeSwiper();
    }
  }

  // Some carousels may be declared in initial render, when their items have yet to be filled.
  componentDidUpdate(prevProps) {
    const { items } = this.props;
    const prevItems = prevProps.items;

    if (items.length > 0 && items.length !== prevItems.length) {
      this.initializeSwiper();
    }
  }

  initializeSwiper() {
    const { slidesPerView } = this.props;
    const swiperDiv = this.swiperDiv;

    const next_button = swiperDiv.querySelector('.swiper-button-next');
    const prev_button = swiperDiv.querySelector('.swiper-button-prev');
    const $container = $(swiperDiv);

    new Swiper(this.swiperDiv, {
      slidesPerView: slidesPerView,
      spaceBetween: 30,
      slidesPerGroup: slidesPerView,
      breakpoints: {
        // when window width is <= 320px
        320: {
          slidesPerView: 1,
          slidesPerGroup: 1,
          spaceBetween: 10
        },
        // when window width is <= 480px
        480: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 10
        },
        // when window width is <= 640px
        640: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 30
        }
      },
      keyboardControl: true,
      navigation: {
        nextEl: next_button,
        prevEl: prev_button
      },
      a11y: true,
      prevSlideMessage: 'Previous item',
      nextSlideMessage: 'Next item',
      firstSlideMessage: 'This is the first item',
      lastSlideMessage: 'This is the last item',
      on: {
        reachEnd: function() {
          const swiper = this;
          $container.append(
            '<div class="swiper-button-next refresh-button" aria-disabled="false" tabindex="0" role="button" aria-label="Return to first item" style="background-color: rgb(78, 42, 132); background-image: url(\'//common.northwestern.edu/v8/css/images/icons/refresh.svg\');"></div>'
          );
          $container.on('click', '.refresh-button', function() {
            swiper.slideTo(0);
            $(this).remove();
          });
          $container.find('.swiper-button-prev').click(function() {
            $('.refresh-button').remove();
          });
        }
      }
    });
  }

  render() {
    const { items } = this.props;

    return (
      <div className="section showcase">
        <div
          className="swiper-container"
          ref={div => {
            this.swiperDiv = div;
          }}
        >
          <div className="swiper-wrapper">
            {items.map(item => (
              <CarouselItem key={item.id} item={item} />
            ))}
          </div>
          <div className="swiper-button-next" />
          <div className="swiper-button-prev" />
        </div>
      </div>
    );
  }
}

Carousel.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  slidesPerView: PropTypes.number.isRequired
};

export default Carousel;
