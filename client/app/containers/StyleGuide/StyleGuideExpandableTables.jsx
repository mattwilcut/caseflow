import React from 'react';
import StyleGuideComponentTitle from '../../components/StyleGuideComponentTitle';
// components
import Table from '../../components/Table';
import ToggleButton from '../../components/ToggleButton';
import Button from '../../components/Button';
import { ChevronDown, ChevronUp } from '../../components/RenderFunctions';


export default class StyleGuideExpandaleTables extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      active: {
        SHOW_COMMENTS: 'show_comments',
        HIDE_COMMENTS: 'hide_comments'
      }
    };
  }

  handleToggleClick = () => {
    this.setState({
      allCommentsExpanded: !this.state.expanded
    });
  }

  menuClick = (name) => {
    this.setState({ active: name });
  }

  commentIcons = (expanded) => expanded ? <ChevronUp /> : <ChevronDown />;

  expandableComment = (comment) => {
    return <ul className="cf-no-styling-list">
      <div className="horizontal-comment">
        <div className="comment-container comment-horizontal-container comment-content">
          {comment.comment}
        </div>
      </div>
    </ul>
  };

  getColumns = (row) => {

    if (row && row.expandable) {
      return [
        {
          header: 'Comment',
          valueFunction: (row) => this.expandableComment(row),
          span: () => {return 6}
        }];
    }

    return [
      {
        header: 'Name',
        valueName: 'name'
      },
      {
        header: 'Date of Birth',
        align: 'center',
        valueName: 'dateofbirth'
      },
      {
        header: 'Likes ice cream?',
        align: 'center',
        valueFunction: (person) => {
          return person.likesIceCream ? 'Yes' : 'No';
        }
      },
      {
        header: 'Details',
        align: 'center',
        valueFunction: (person, rowNumber) => {
          return <span className="document-list-comments-indicator">
           <Button
            classNames={['cf-btn-link']}
            href={`#details-${rowNumber}`}
            name="See_more"
            onClick={this.handleClick}>See more
            <span className="cf-table-left">
            {this.commentIcons(this.state.expanded)}
            </span>
          </Button>
         </span>;
        }
      }
    ];

  }
  render = () => {

  // List of objects which will be used to create each row
    const activeState = this.state.active;
    const rowObjects = [
      { name: 'Marian',
        dateofbirth: '07/04/1776',
        likesIceCream: true
      },
      { comment: 'Marian likes chocolate chip ice cream.',
        expandable: true
      },
      { name: 'Shade',
        dateofbirth: '04/29/2015',
        likesIceCream: true },
      { comment: 'Shade likes jazzy peanut butter ice cream with extra hot fudge.',
        expandable: true
      },
      { name: 'Teja',
        dateofbirth: '06/04/1919',
        likesIceCream: true },
      { comment: 'Teja used to work at an ice cream shop and got very sick of it smelling dairy....',
        expandable: true
      },
      { name: 'Gina',
        dateofbirth: '04/23/1564',
        likesIceCream: false },
      { comment: 'Gina is lactose intolerant. It is very unfortunate.',
        expandable: true }
    ];

    return <div className="cf-sg-tables-section">
  <StyleGuideComponentTitle
     title="Expandable Tables"
      id="expandable_table"
      link="StyleGuideExpanableTables.jsx"
    />

    <h3>Table accordion</h3>
    <p>
      The table accordion was initially designed for Caseflow Reader to allow
      users to see additional information of a specific section.
      Many times the length of content can break the balance of design
      and we want to make sure we capture the most important elements in a row.
      This design cues users to expand a view so that they have enough context
      to know what to expect.
    </p>

    <div className="cf-push-right">
    <ToggleButton active={this.state.active}
       onClick={this.handleToggleClick}>
      <Button
       name={activeState.SHOW_COMMENTS}>
       Expand all
      </Button>
      <Button
       name={activeState.HIDE_COMMENTS}>
       Collapse all
      </Button>
     </ToggleButton>
     </div>

    <Table
    columns={this.getColumns}
    rowObjects={rowObjects}
    slowReRendersAreOk={true}
    />
  </div>;
  }
}
