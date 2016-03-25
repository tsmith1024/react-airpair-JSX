var RecordForm = React.createClass({
  getInitialState: function() {
    return {
      title: '',
      date: '',
      amount: '',
    };
  },

  valid: function() {
    return this.state.title && this.state.date && this.state.amount;
  },

  handleChange: function(e) {
    var name = e.target.name;
    var currentState = this.state;
    currentState[name] = e.target.value;
    this.setState(currentState);
  },

  handleSubmit: function(e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/records",
      data: { record: this.state },
      context: this,
      dataType: "JSON",
      success: function(data) {
        this.props.handleNewRecord(data)
        this.setState(this.getInitialState())
      }
    });
  },

  render: function() {
    return (
      <form className="form-inline" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input className="form-control" value={this.state.date} type="text" placeholder="Date" name="date" onChange={this.handleChange} onBlur={this.handleChange}>
          </input>
        </div>
        <div className="form-group">
          <input className="form-control" value={this.state.title} type="text" placeholder="Title" name="title" onChange={this.handleChange} onBlur={this.handleChange}>
          </input>
        </div>
        <div className="form-group">
          <input className="form-control" value={this.state.amount} type="number" placeholder="Amount" name="amount" onChange={this.handleChange} onBlur={this.handleChange}>
          </input>
        </div>
        <button className="btn btn-primary" type="submit" disabled= {!this.valid()}>Create record</button>
      </form>
    );
  }
})
