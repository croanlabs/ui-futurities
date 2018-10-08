import React, { Component } from "react";
import downArrow from "../../assets/icons/polls/down-arrow.png";
import upArrow from "../../assets/icons/polls/up-arrow.png";
import profilePic from "../../assets/images/profile/Aripaul@2x.png";
import downTriggerArrow from "../../assets/icons/collapse-icon.png";
import Withdraw from "../WithdrawModify/Withdraw";
import Modify from "../WithdrawModify/Modify";
import appToken from "../../utils/AppToken";
import "./CandidateMyPosition.scss";

class CandidateMyPosition extends Component {
  constructor() {
    super();

    this.state = { active: false };
  }

  componentDidMount() {
    let op = this.props.opinion;
    let supply = op.confidence
      ? op.candidate.total_tokens_confidence
      : op.candidate.total_tokens_no_confidence;
    let merits = appToken.tokenToMeritsRedeem(op.token_amount, supply);

    this.setState({
      merits,
      candidate: this.props.opinion.candidate,
      opinion: this.props.opinion,
      arrowConfidence: this.props.opinion.confidence ? "up" : "down"
    });
  }

  onClick() {
    if (!this.state.active) {
      this.setState({ active: true, content: "withdraw" });
    }
  }

  onMouseEnter() {
    this.setState({ showExpand: true });
  }

  onMouseLeave() {
    this.setState({ showExpand: false });
  }

  showFormModify() {
    this.setState({ content: "modify" });
  }

  showFormWithdraw() {
    this.setState({ content: "withdraw" });
  }

  expandOrContract() {
    this.setState({ active: !this.state.active });
  }

  render() {
    if (!this.state.candidate) {
      return null;
    }
    let extraComponent;
    if (this.state.active && this.state.content == "withdraw") {
      extraComponent = (
        <Withdraw
          showFormModify={this.showFormModify.bind(this)}
          candidate={this.props.opinion.candidate}
          amountOfStakedMerits={this.state.merits}
        />
      );
    }
    if (this.state.active && this.state.content == "modify") {
      extraComponent = (
        <Modify
          showFormWithdraw={this.showFormWithdraw.bind(this)}
          candidate={this.props.opinion.candidate}
        />
      );
    }

    let expand;
    if (this.state.showExpand) {
      expand = (
        <div
          className="arrow-trigger"
          onClick={this.expandOrContract.bind(this)}
        >
          <i>
            <img
              src={downTriggerArrow}
              alt="Expanded"
              className={`${this.state.active ? "up" : "down"}-arrow`}
            />
          </i>
        </div>
      );
    }
    return (
      <div className="candidate-myposition">
        <li
          className={`card ${this.props.color} candidate-my-position`}
          onClick={this.onClick.bind(this)}
          onMouseEnter={this.onMouseEnter.bind(this)}
          onMouseLeave={this.onMouseLeave.bind(this)}
        >
          <div className="card-container">
            {expand}
            <div className="flex-sb">
              <div className="profile flex">
                <div className="number">{this.props.corr + 1}</div>
                <div className="image-cropper">
                  <img
                    src={
                      this.state.candidate.profile_picture_url
                        ? this.state.candidate.profile_picture_url
                        : profilePic
                    }
                    alt="Metem"
                    className="profile-pic"
                  />
                </div>
                <div className="name">
                  <h2>{this.state.candidate.name}</h2>
                  <h3>{this.state.candidate.twitter_user}</h3>
                </div>
              </div>

              <div className="rating rating-opinion flex">
                <div
                  className={`merits-box-opinions ${
                    this.state.arrowConfidence
                  } flex`}
                >
                  <i>
                    <img
                      src={this.state.opinion.confidence ? upArrow : downArrow}
                      alt={`Rating${this.state.arrowConfidence}`}
                    />
                  </i>
                  <span className="merit-num">
                    {this.state.merits ? this.state.merits : 0} Merits
                  </span>
                </div>
              </div>
            </div>
            {extraComponent}
          </div>
        </li>
      </div>
    );
  }
}

export default CandidateMyPosition;
