import React from "react";

class TimeoutNotification extends React.Component {
    triggerNotification(time = 1000) {
        this.notifierTimeout = setTimeout(() => {
            this.props.onTimeout();
        }, time);
    }

    componentWillReceiveProps(nextProps) {
        if (!!this.props.activation !== !!nextProps.activation)
            this.triggerNotification(nextProps.time || this.props.time);
    }

    componentWillUnmount() {
        if (this.notifierTimeout)
            clearInterval(this.notifierTimeout);
    }

    render() {
        return this.props.activation ? (
            <div style={ {
                color: "#32C949",
                display: "flex",
                alignItems: "center",
                width: "100%", height: "100%" } }>{ this.props.children }</div>
        ) : null;
    }
}

export default TimeoutNotification;