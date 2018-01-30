import React from "react";

class TimeoutNotification extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notified: false
        };
    }

    triggerNotification(time = 1000) {
        this.setState({ notified: true });

        this.notifierTimeout = setTimeout(() => {
            this.setState({ notified: false });
        }, time);
    }

    componentWillReceiveProps(nextProps) {
        if (!!this.props.activation !== nextProps.activation)
            this.triggerNotification(nextProps.time || this.props.time);
    }

    componentWillUnmount() {
        if (this.notifierTimeout)
            clearInterval(this.notifierTimeout);
    }

    render() {
        return this.state.notified ? (
            <div style={ {
                color: "#32C949",
                display: "flex",
                alignItems: "center" } }>{ this.props.children }</div>
        ) : null;
    }
}

export default TimeoutNotification;