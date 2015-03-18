//  http://tylermcginnis.com/reactjs-tutorial-a-comprehensive-guide-to-building-apps-with-react/

var TextChoice = React.createClass({
  getInitialState: function(){
    return {
       diableChoiceCount: true
    }
  },

  render: function() {
    return (
      null
    );
  }
});

var MultipleChoice = React.createClass({
  propTypes: {
    count: React.PropTypes.number.isRequired,
    store: React.PropTypes.array.isRequired
  },

  getDefaultProps: function() {
    return {
      count: 4
    }
  },

  _addQuestion: function(event) {
    console.log('Add question ' + event.target.value);
    this.props.store.push({value: event.target.value})
  },

  render: function() {
    if (this.props.store.length == 0) {
      return (
        <ul className="choices-list">
          { _(this.props.count).times(function(idx) {
            return (
              <li key={'cb-list' + idx}>
                <span>{(idx + 1) + '.'}</span> <input type="text" placeholder={'Choices option ' + (idx + 1)} />
              </li>
            );
          }.bind(this)) }
        </ul>
      );
    } else {
      return (
        <ul className="choices-list">
          { _(this.props.store).map(function(model, idx) {
            return (
              <li key={'cb-list' + idx}>
                <span>{(idx + 1) + '.'}</span> <input type="text" value={model.value} placeholder={'Choices option ' + (idx + 1)} />
              </li>
            );
          }) }
        </ul>
      );
    }
  }
});

var SingleChoice = React.createClass({
  propTypes: {
    count: React.PropTypes.number.isRequired
  },

  getDefaultProps: function() {
    return {
      count: 4
    };
  },

  render: function() {
    return (
      <ul className="choices-list">
        { _(this.props.count).times(function(idx) {
          return (
            <li key={'rb-list' + idx}>
              <span>{(idx + 1) + '.'}</span> <input type="text" placeholder={'Single choice ' + (idx + 1)} />
            </li>
          );
        }) }
      </ul>
    );
  }
});

var OpenEnded = React.createClass({
  propTypes: {
    count: React.PropTypes.number.isRequired
  },

  getDefaultProps: function() {
    return {
      count: 4
    };
  },

  render: function() {
    return (
      <ul className="choices-list">
        { _(this.props.count).times(function(idx) {
          return (
            <li key={'oq-list' + idx}>
              <span>{(idx + 1) + '.'}</span> <input type="text" name={'oq' + idx} placeholder={'Open ended question ' + (idx + 1)} size="57" />
            </li>
          );
        }) }
      </ul>
    );
  }
});

var ChoiceCount = React.createClass({
  getInitialState: function() {
    return {
      numOfChoices: 4
    }
  },

  setNumOfChoices: function(event) {
    this.setState({
      numOfChoices: parseInt(event.target.value, 10)
    });
  },

  render: function () {
    return <div>
      <input className="btn choice-count" type="number" min="1" name="numOfChoices" onChange={this.setNumOfChoices} value={this.state.numOfChoices} />
    </div>
  }
});

var SegmentedControl = React.createClass({
  getInitialState: function() {
    return {
      questionItems: this.props.questionItems,
      questionItem: this.props.questionItem,
      questionTypes: ['Text', 'Multiple Choice', 'Single Choice', 'Open Ended'],
      numOfChoices: 4,
      isFavorite: false,
      currentSegment: 'Text',
      multipleChoiceQuestions: [],
      radioQuestions: [],
      openQuestions: []
    }
  },

  // _removeQuestionItem: function(questionItem) {
  //   var questionItems = this.props.questionItems,
  //       questionItem = this.props.questionItem,
  //       index = questionItems.indexOf(questionItem);
  //
  //   if (index !== -1) {
  //     questionItems.splice(index, 1);
  //   }
  //
  //   this.setState({ questionItems: questionItems });
  // },

  setFavorite: function(event) {
    this.setState({
      isFavorite: !this.state.isFavorite
    });

    var likes = !this.state.isFavorite ? 'liked' : 'unliked'
    alert('You ' + likes + ' this Favorite question!');
  },

  segmentValueChanged: function(label) {
    this.setState({
      currentSegment: label
    });
  },

  setNumOfChoices: function(event) {
    this.setState({
      numOfChoices: parseInt(event.target.value, 10)
    });
  },

  currentSegment: function() {
    if (this.state.currentSegment == 'Text') {
      return <TextChoice />;
    } else if (this.state.currentSegment == 'Multiple Choice') {
      return <MultipleChoice count={this.state.numOfChoices} store={this.state.multipleChoiceQuestions} />;
    } else if (this.state.currentSegment == 'Single Choice') {
      return <SingleChoice count={this.state.numOfChoices} />;
    } else if (this.state.currentSegment == 'Open Ended') {
      return <OpenEnded count={this.state.numOfChoices} />;
    }
  },

  render: function() {
    // console.log(Object.keys(this.props.questionItems))
    return <div>
      <div className="question_fields">
        <div className="question_textarea">
          <textarea rows="4" cols="60" placeholder="Ask Anything for candidates..." autofocus></textarea>
        </div>
        <div className="question_functions">
          <span>
            <RemoveQuestion questionItems={this.state.questionItems} questionItem={this.state.questionItem}  removeQuestionItem={this._removeQuestionItem} />
          </span>&nbsp;
          <span>
            <button className={'btn' + (this.state.isFavorite == true ? ' current' : '')}
              onClick={this.setFavorite}> <u>&#x02605;</u> <small>Favorite</small>
            </button>
          </span>
        </div>
        <div className="btn-group">
          <input className="btn choice-count" type="number" min="1" name="numOfChoices" onChange={this.setNumOfChoices} value={this.state.numOfChoices} />

          { this.state.questionTypes.map(function(label, idx) {
            return (
              <button className={'btn' + (this.state.currentSegment == label ? ' current' : '')} type="button" key={'btn' + idx}
                onClick={this.segmentValueChanged.bind(this, label)}>{ label }
              </button>
            );
          }.bind(this)) }

        </div>
        <div className="choices">
          { /* The parent has to keep track of the Choice state */ }
          { this.currentSegment() }
        </div>

      </div>
    </div>;
  }
});

var QuestionItem = React.createClass({
  render: function() {
    return (
      <div className="question_label">
        <h4>
          <span><b>Question</b> </span>
          <span>{this.props.questionItem}:</span>
        </h4>
        <div><small> Serene Lim </small></div>
        <div><small> 2 months ago </small></div>
      </div>
    );
  }
});

var QuestionList = React.createClass({
  render: function() {
    var questionItems = this.props.questionItems;

    return (
      <ul className="question_container">
        { _(questionItems).map(function(questionItem, idx) {
          return (
            <li className="list-question" key={idx}>
              <div className="question_view">
                <table>
                  <tr>
                    <td><QuestionItem questionItem={idx + 1} /></td>
                    <td><SegmentedControl questionItems={questionItems} questionItem={questionItem} /></td>
                  </tr>
                </table>
              </div>

            </li>
          );
        }) }
      </ul>
    );
  }
});

var AddQuestion = React.createClass({
  getInitialState: function(){
    return {
      newQuestion: 'Question'
    }
  },

  updateNewQuestion: function(e) {
    this.setState({ newQuestion: e.target.value });
  },

  _handleAddNew: function(e) {
    this.props.addNew(this.state.newQuestion);
    this.setState({ newQuestion: 'Question' });
  },

  render: function() {
    return <div className="add-question">
      <button onClick={this._handleAddNew}> <u>+</u> <small>Add</small> </button>
    </div>
  }
});

var RemoveQuestion = React.createClass({
  getInitialState: function() {
    return {
      questionItems: this.props.questionItems,
    }
  },

  _removeQuestionItem: function() {
    var questionItems = this.props.questionItems,
        questionItem = this.props.questionItem,
        index = questionItems.indexOf(questionItem);

    console.log('QuestionItem(s): ' + questionItems)
    // console.log('QuestionItem is ' + questionItem + ' ==+== index is ' + index );
    if (index !== -1) {
      questionItems.splice(index, 1);
      console.log('QuestionItems is now : ' + questionItems)
    }
    this.setState({ questionItems: questionItems });
  },

  render: function() {
    return <button type="button" onClick={this._removeQuestionItem}>
      <u>x</u> <small>Remove</small>
    </button>
  }
});

var SaveTemplate = React.createClass({
  _saveQuestionair: function() {
    alert("This will save the Template Builder");
  },

  render: function() {
    console.log('Save this Array : ' + this.props.questionItems);
    return <div className="save_button">
      <button onClick={this._saveQuestionair}> Save </button>
    </div>
  }
});

var QuestionBuilder = React.createClass({
  getInitialState: function() {
    return {
      questionItem: '', creator: '', createdDate: '',
      questionItems: [], creators: [], createdDates: [],
    }
  },

  _addQuestion: function(questionItem) {
    this.setState({
      questionItems: this.state.questionItems.concat([questionItem])
    });
  },

  // _removeQuestionItem: function(questionItem) {
  //   var questionItems = this.state.questionItems,
  //       index = questionItems.indexOf(questionItem);
  //
  //   if (index !== -1) {
  //     questionItems.splice(index, 1);
  //   }
  //
  //   this.setState({ questionItems: questionItems });
  // },

  render: function() {
    if (this.state.questionItems.length > 0) {
      saveButton = <SaveTemplate questionItems={this.state.questionItems} />
    } else {
      saveButton = ''
    }

    return <div className="questionnaire">
      <h3> Template Library :: Information Required (Server) </h3>
      <AddQuestion addNew={this._addQuestion} />
      <QuestionList questionItems={this.state.questionItems} />
      { saveButton }
    </div>
  }
});

var question_builder = document.getElementById('question_builder');
React.render(<QuestionBuilder />, question_builder)