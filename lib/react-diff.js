var React = require('react');
var jsdiff = require('diff');

var fnMap = {
  'chars': jsdiff.diffChars,
  'words': jsdiff.diffWords,
  'sentences': jsdiff.diffSentences,
  'json': jsdiff.diffJson
};

module.exports = React.createClass({
  displayName: 'Diff',

  getDefaultProps: function() {
    return {
      inputA: '',
      inputB: '',
      type: 'chars'
    };
  },

  propTypes: {
    className: React.PropTypes.string,
    inputA: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object
    ]),
    inputB: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object
    ]),
    type: React.PropTypes.oneOf([
      'chars',
      'words',
      'sentences',
      'json'
    ])
  },

  render: function () {
    var className = this.props.className ? 'diff-result' + ' ' + this.props.className : 'diff-result';
    var diff = fnMap[this.props.type](this.props.inputA, this.props.inputB);
    var result = diff.map(function(part, index) {
      var spanStyle = {
        backgroundColor: part.added ? 'lightgreen' : part.removed ? 'salmon' : 'lightgrey'
      };
      return <span key={index} style={spanStyle}>{part.value}</span>
    });
    return (
      <pre className={className}>
        {result}
      </pre>
    );
  },
});
