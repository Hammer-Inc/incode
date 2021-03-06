import {Component} from "react/cjs/react.production.min";
import PropTypes from "prop-types";
import React from "react";
import {Checkbox, GridTile, Paper} from "material-ui";
import {ActionTurnedIn, ActionTurnedInNot} from "material-ui/svg-icons/index";
import {grey900} from "material-ui/styles/colors";

export default class Sheet extends Component {
    static colours = {
        sheet: {
            background: 'rgba(255,255,255,1)',
            fade: 'rgba(255,255,255,0)',
            fadeText: 'rgba(0,0,0,1)',
            value: 'rgba(0,0,0,1)',
            valueHover: 'rgba(0,0,0,0.7)',

        },
        header: {
            text: 'rgba(0,0,0,1)',
            background: 'rgba(100,100,100,0.3)',
            border: 'rgba(0,0,0,1)'
        }
    };

    static propTypes = {
        identifier: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        index: PropTypes.number.isRequired,
        header: PropTypes.string.isRequired,
        title: PropTypes.string,
        onClick: PropTypes.func.isRequired,
        highlight: PropTypes.shape({
            type: PropTypes.string.isRequired,
            style: PropTypes.object.isRequired,
            statusStyle: PropTypes.object.isRequired,
        }),

        headerStyle: PropTypes.object,
        overlayStyle: PropTypes.object,
        cardStyle: PropTypes.object,
        indexStyle: PropTypes.object,

        iconEnabled: PropTypes.bool,
        iconSelected: PropTypes.bool,
        onIconClick: PropTypes.func,

    };

    constructor(props) {
        super(props);
        this.state = {
            hover: false
        }
    }

    onMouseEnter = () => {
        if (this.state.isParity) {
            this.setState({
                hover: true
            })
        }
    };
    onMouseLeave = () => {
        if (this.state.isParity) {
            this.setState({
                hover: false
            })
        }
    };

    render() {
        let headerStyle = {
            ...{
                backgroundColor: Sheet.colours.header.background,
                borderColor: Sheet.colours.header.border,
                color: 'black',
                display: 'inline-block',
                borderRightStyle: 'inset',
                borderBottomStyle: 'inset',
                borderRightWidth: '2px',
                borderBottomWidth: '2px',
                zIndex: '999'
            },
            ...this.props.headerStyle
        };
        let overlayBg = this.props.overlayStyle || Sheet.colours.sheet.fade;
        let statusStyle = {
            ...{
                display: 'inline-block',
                fontSize: '11px',
                textAlign: 'center'
            }, ...(this.props.highlight === undefined ? {} : this.props.highlight.statusStyle)
        };
        let cardStyle = {
            ...{
                margin: '1px 1px',
                minWidth: '150px',
                textAlign: 'left',
                height: '100%',
                border: ''
            },
            ...this.props.cardStyle,
            ...(this.props.highlight !== undefined ? this.props.highlight.style : {})
        };
        let indexStyle = {
            ...{
                display: 'inline-block',
                color: Sheet.colours.sheet.value,
                fontSize: '22px',
                zIndex: '999'
            },
            ...this.props.indexStyle
        };

        const valueStyle = {
            fontSize: '100px',
            textAlign: 'center',
            position: 'absolute',
            cursor: 'pointer',
            width: '100%',
            color: 'inherit',
            WebkitTouchCallout: "none",
            WebkitUserSelect: "none",
            KhtmlUserSelect: "none",
            MozUserSelect: "none",
            msUserSelect: "none",
            userSelect: "none",
        };
        const overlayTextStyle = {
            color: Sheet.colours.sheet.fadeText,
            marginRight: '16px !important'
        };
        const headerBar = {
            display: 'flex',
            justifyContent: 'space-between'
        };


        return (

            <GridTile
                key={this.props.identifier}
                title={this.props.title}
                titleStyle={overlayTextStyle}
                style={overlayTextStyle}
                titleBackground={overlayBg}
                actionIcon={
                    <Checkbox
                        onClick={this.props.onIconClick}
                        disabled={!this.props.iconEnabled}
                        checked={this.props.iconSelected}
                        checkedIcon={<ActionTurnedIn style={{fill: grey900}}/>}
                        uncheckedIcon={<ActionTurnedInNot/>}
                        iconStyle={{fill: grey900}}
                        style={!this.props.iconEnabled ? {display: 'none'} : undefined}
                    />
                }
            >
                <Paper
                    style={cardStyle}>

                    <div
                        onMouseEnter={this.onMouseEnter}
                        onMouseLeave={this.onMouseLeave}
                        onClick={this.props.onClick}
                        style={{...valueStyle, ...(this.state.isHovered ? {color: Sheet.colours.sheet.valueHover} : {color: Sheet.colours.sheet.value})}}>
                        {this.props.value}
                    </div>
                    <div style={headerBar}>
                        <h5 style={headerStyle}>
                            {this.props.header}
                        </h5>
                        {this.props.highlight !== undefined ?
                            (
                                <h6 style={statusStyle}>
                                    {this.props.highlight.type}
                                </h6>
                            ) : null
                        }
                        <h6 style={indexStyle}>
                            {1 + this.props.index}
                        </h6>
                    </div>
                </Paper>
            </GridTile>
        )
            ;
    };
}