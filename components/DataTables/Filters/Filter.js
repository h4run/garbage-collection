import styled from "styled-components";

export default class Filter extends React.Component {
  static defaultProps = {
    sortIcon: "icon-sort-reverse"
  };
  _handleOnChange = e => {
    const { onChange } = this.props;
    if (onChange) onChange(e.target.value);
  };
  render() {
    const { label, sortIcon, isEditable, searchDisabled } = this.props;
    return (
      <Container>
        <div className="label-area">
          <label>
            {label}{" "}
            {isEditable && (
              <a href="javascript:;" className="edit-btn">
                <i className="icon-pencil" />
              </a>
            )}
          </label>
          <a href="javascript:;" className="sort-btn">
            <i className={sortIcon} />
          </a>
        </div>
        <div className="input-holder">
          <input
            placeholder="Search"
            type="text"
            onChange={this._handleOnChange}
            disabled={searchDisabled}
          />
        </div>
      </Container>
    );
  }
}

const Container = styled.div`
  .edit-btn {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    margin-left: 5px;
    display: flex;
    background-color: ${props => props.theme.colors.primaryDark};
    color: white;
    font-size: 8px;
    i {
      margin: auto;
    }
  }

  .sort-btn {
    color: #c1c7d2;
    &:hover  {
      color: #64686f;
    }
  }

  .label-area {
    display: flex;
    justify-content: space-between;

    label {
      font-weight: 500;
      font-size: 14px;
      display: flex;
      align-items: center;
    }
  }
  .input-holder  {
    padding: 15px 25px 20px 0;
    @media screen and (max-width: 500px) {
      padding: 5px 0 15px 0;
    }
  }
  input {
    border: 1px solid #ccd0d9;
    height: 34px;
    display: flex;
    padding-left: 12px;
    padding-right: 12px;
    width: 100%;
    font-size: 14px;
    &:disabled {
      background-color: #ebebeb;
    }
  }
`;
