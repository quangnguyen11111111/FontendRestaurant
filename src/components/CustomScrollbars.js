import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";

import "./CustomScrollbars.scss";

class CustomScrollbars extends Component {
    ref = React.createRef();

    // Lấy vị trí scroll hiện tại (nếu cần)
    getScrollLeft = () => {
        const scrollbars = this.ref.current;
        return scrollbars.getScrollLeft();
    };

    getScrollTop = () => {
        const scrollbars = this.ref.current;
        return scrollbars.getScrollTop();
    };

    // Cuộn tới vị trí cuối trang (nếu cần)
    scrollToBottom = () => {
        if (!this.ref || !this.ref.current) {
            return;
        }
        const scrollbars = this.ref.current;
        const targetScrollTop = scrollbars.getScrollHeight();
        this.scrollTo(targetScrollTop);
    };

    // Hàm cuộn tới vị trí mong muốn
    scrollTo = (targetTop) => {
        if (!this.ref || !this.ref.current) {
            return;
        }
        const scrollbars = this.ref.current;
        scrollbars.scrollTop(targetTop);
    };

    // componentDidUpdate(prevProps) {
    //     // Khi props thay đổi, reset scroll về đầu
    //     if (prevProps.children !== this.props.children) {
    //         this.scrollTo(0);
    //     }
    // }

    renderTrackHorizontal = (props) => {
        return <div {...props} className="track-horizontal" />;
    };

    renderTrackVertical = (props) => {
        return <div {...props} className="track-vertical" />;
    };

    renderThumbHorizontal = (props) => {
        return <div {...props} className="thumb-horizontal" />;
    };

    renderThumbVertical = (props) => {
        return <div {...props} className="thumb-vertical" />;
    };

    renderNone = (props) => {
        return <div />;
    };

    render() {
        const {
            className,
            disableVerticalScroll,
            disableHorizontalScroll,
            children,
            ...otherProps
        } = this.props;
        return (
            <Scrollbars
                ref={this.ref}
                autoHide={true}
                autoHideTimeout={200}
                hideTracksWhenNotNeeded={true}
                className={
                    className ? className + " custom-scrollbar" : "custom-scrollbar"
                }
                {...otherProps}
                renderTrackHorizontal={
                    disableHorizontalScroll ? this.renderNone : this.renderTrackHorizontal
                }
                renderTrackVertical={
                    disableVerticalScroll ? this.renderNone : this.renderTrackVertical
                }
                renderThumbHorizontal={
                    disableHorizontalScroll ? this.renderNone : this.renderThumbHorizontal
                }
                renderThumbVertical={
                    disableVerticalScroll ? this.renderNone : this.renderThumbVertical
                }
            >
                {children}
            </Scrollbars>
        );
    }
}

export default CustomScrollbars;
