var Records = React.createClass ({
  getInitialState: function() {
    return { records: this.props.data }
  },

  getDefaultProps: function() {
    return { records: [] }
  },

  addRecord: function(record) {
    var records = React.addons.update(this.state.records, { $push: [record] });
    this.setState({records: records});
  },
  updateRecord: function(record, data) {
    var index = this.state.records.indexOf(record);
    var records = React.addons.update(this.state.records, { $splice: [[index, 1, data]] });
    this.replaceState({records: records});
  },
  deleteRecord: function(record) {
    var index = this.state.records.indexOf(record);
    var records = React.addons.update(this.state.records, { $splice: [[index, 1]] });
    this.replaceState({records: records});
  },

  getAmountSum: function(arr) {
    return arr.reduce(function(prev, curr){
      return prev + parseFloat(curr.amount)
    }, 0)
  },

  credits: function() {
    var credits = this.state.records.filter(function(val){
      return !!val && val.amount >= 0;
    });
    return this.getAmountSum(credits);
  },
  debits: function() {
    var debits = this.state.records.filter(function(val){
      return !!val && val.amount < 0;
    });
    return this.getAmountSum(debits);
  },
  balance: function() { return this.debits() + this.credits() },

  render: function() {
    var display_records = [];
    for (var i in this.state.records) {
      record = this.state.records[i]
      display_records.push(<Record key={record.id} record={record} handleDeleteRecord={this.deleteRecord} handleEditRecord={this.updateRecord}/>)
    }

    return (
      <div className="records">
        <h2 className="title">
          Records
        </h2>
        <div className="row">
          <AmountBox type="success" amount={this.credits()} text="Credit" />
          <AmountBox type="danger" amount={this.debits()} text="Debit" />
          <AmountBox type="info" amount={this.balance()} text="Balance" />
        </div>
        <RecordForm handleNewRecord={this.addRecord}/>
        <hr/>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{display_records}</tbody>
        </table>
      </div>
    )
  }
});
