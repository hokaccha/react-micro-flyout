import React from 'react';
import ReactDOM from 'react-dom';

export default class Flyout extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickDocument = this.handleClickDocument.bind(this);
  }

  componentDidMount() {
    if (this.props.open) {
      this.attachEvent();
    }
  }

  componentWillUnmount() {
    this.detachEvent();
  }

  componentWillReceiveProps({ open }) {
    if (open === this.props.open) return;

    if (open) {
      this.attachEvent();
    }
    else {
      this.detachEvent();
    }
  }

  attachEvent() {
    document.addEventListener('click', this.handleClickDocument);
  }

  detachEvent() {
    document.removeEventListener('click', this.handleClickDocument);
  }

  handleClickDocument(e) {
    let dom = ReactDOM.findDOMNode(this);

    if (dom && !dom.contains(e.target) && this.props.open) {
      this.props.onRequestClose();
    }
  }

  render() {
    let style = this.props.style || {};

    if (!this.props.open) {
      style.display = 'none';
    }

    return <div {...this.props} style={style}>{this.props.children}</div>;
  }
}

Flyout.propTypes = {
  open: React.PropTypes.bool.isRequired,
  onRequestClose: React.PropTypes.func.isRequired,
};
