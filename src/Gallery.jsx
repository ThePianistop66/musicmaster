import React, {Component} from 'react';
import './App.css';

class Gallery extends Component {
  constructor(props){
    super(props);
    this.state ={
      playingUrl:'',
      audio:null,
      playing:false
    }
  }

  playAudio(previewURL) {
    let audio = new Audio(previewURL);
    if(!this.state.playing) {
      audio.play();
      this.setState({
        playing:true,
        playingUrl:previewURL,
        audio
      })
    } else {
      this.state.audio.pause();
      if (this.state.playingUrl === previewURL) {
        this.setState({
          playing:false
        })
      } else {
        audio.play();
        this.setState({
          playing:true,
          playingUrl:previewURL,
          audio
        })
      }
    }
  }

  render() {
    const {tracks} = this.props;
    return (
      <div>
        {tracks.map((track,index) => {
          console.log('track',track);
          const trackImg = track.album.images[0].url;
          return(
          <div
            key={index}
            className='track'
            onClick={() => this.playAudio(track.preview_url)}
          >
            <img
              src={trackImg}
              className='track-img'
              alt='track'
            />
          <div className='track-play'>
            <div className='track-play-inner'>
              {
                this.state.playingUrl === track.preview_url && this.state.playing
                  ? <span>| |</span>
                  : <span>&#9654;</span>
              }
            </div>
          </div>
          <p className='track-text'>
            {track.name}
          </p>
          </div>
        )
        })}
        </div>
    )
  }
}

export default Gallery;
