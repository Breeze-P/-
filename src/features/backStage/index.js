import React from 'react';
import "./style.css";

const BackStage = () => {
    return (
        <div className="back-container">
            <div className="back-row back-form-item">
                <div className="back-col back-form-item-control-wrapper">
                    <div className="back-form-item-control has-success">
                        <span className="back-form-item-children">
                            <span className="back-input-affix-wrapper">
                                <input placeholder="name" type="text" id="name" data-__meta="[object Object]" data-__field="[object Object]"
                                       className="back-input" value=""/>
                                </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BackStage