import React, { Component } from "react";
import axios from "axios";
import CandidateMyPosition from "../Candidate/CandidateMyPosition";
import searchIcon from "../../assets/icons/coloursearch-icon.png";
import "./Candidates.scss";

class CandidatesMyPosition extends Component {
  constructor() {
    super();
    this.state = { searchValue: "", opinions: [] };
  }

  async componentDidMount() {
    // TODO move this query to other place, it's being called all the time.
    const { data: opinions } = await axios({
      method: "get",
      baseURL: process.env.REACT_APP_API_URL,
      url: process.env.REACT_APP_API_OPINIONS,
      withCredentials: true
    });
    this.setState({ opinions });
  }

  search(ev) {
    this.setState({ searchValue: ev.target.value });
  }

  onCandidateExpanded(idExpandedCandidate) {
    this.setState({ idExpandedCandidate });
  }

  render() {
    const { length: count } = this.state.opinions;
    const { colors } = this.props;

    const opinionsSelectedPoll = this.state.opinions.filter(
      opinion => opinion.candidate.pollId == this.props.pollId
    );

    if (opinionsSelectedPoll.length === 0)
      return <p>You have not voiced any opinion on this poll yet.</p>;

    const resultOpinions = opinionsSelectedPoll.filter(opinion => {
      let candidate = opinion.candidate;
      let search = this.state.searchValue || "";
      const searchLower = search.toLowerCase();
      return (
        candidate.pollId == this.props.pollId &&
        (candidate.name.toLowerCase().indexOf(searchLower) >= 0 ||
          candidate.twitterUser.toLowerCase().indexOf(searchLower) >= 0)
      );
    });

    return (
      <div className="candidates">
        <div className="search-area">
          <div className="search-bar">
            <img src={searchIcon} alt="Find" />
            <input
              value={this.state.searchValue}
              type="search"
              className="find"
              placeholder="Find Candidate..."
              onChange={this.search.bind(this)}
            />
          </div>
        </div>
        <div className="white-box">
          <div className="total-candidates">
            {/* FIXME count should be changed to candidates of my position */}
            <span>Total Candidates - {count}</span>
          </div>
          <ul className="list-unstyled">
            {resultOpinions.map((opinion, index) => {
              return (
                <CandidateMyPosition
                  key={opinion.id}
                  corr={index}
                  color={colors[index % colors.length]}
                  opinion={opinion}
                  handleOnExpanded={this.onCandidateExpanded.bind(this)}
                  expanded={
                    opinion.candidate.id == this.state.idExpandedCandidate
                  }
                />
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default CandidatesMyPosition;
