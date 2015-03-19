//  http://tylermcginnis.com/reactjs-tutorial-a-comprehensive-guide-to-building-apps-with-react/

var QuestionList = React.createClass({
  removeItem: function(questionItem) {
    // Eveytime you go into a function, the scope and context changes, thus the `this` also changes...
    var questionItems = this.props.questionItems,
        index = questionItems.indexOf(questionItem);

    if (index !== -1) {
      questionItems.splice(index, 1);
    }

    this.setState({ questionItems: questionItems });
  },

  render: function() {
    var questionsNode = _(this.props.questionItems).map(function(questionItem, idx) {
        return (
          <li className="list-question" key={idx}>
            {questionItem} &nbsp; {idx + 1} &nbsp;
            <button onClick={this.removeItem.bind(this, questionItem)} className={'btn'} type="button" key={'btn' + idx}> Remove </button>
          </li>
        );
      }.bind(this))

    return (
      <ul className="question_container">
        { questionsNode }
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

  render: function() {
    return <div className="questionnaire">
      <h3> Template Library :: Information Required (Server) </h3>
      <AddQuestion addNew={this._addQuestion} />
      <QuestionList questionItems={this.state.questionItems} />
    </div>
  }
});

var question_builder = document.getElementById('question_builder');
React.render(<QuestionBuilder />, question_builder)