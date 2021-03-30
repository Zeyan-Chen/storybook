import React from 'react';
import styles from './style.scss';

export class TextAreaBox extends React.Component {
    static getDerivedStateFromProps(props, state) {
        if (props.defaultValue !== state.defaultValue) {
            return { ...state, text: props.defaultValue, defaultValue: props.defaultValue };
        }
        if (props.vertical !== state.vertical) {
            return { ...state, vertical: props.vertical };
        }

        return { ...state };
    }

    constructor(props) {
        super(props);
        this.state = {
            defaultValue: props.defaultValue,
            text: props.value,
            textArr: [],
            vertical: false,
        };

        this.textAreaRef = React.createRef();
    }

    componentDidMount() {
        const { didMountReCalcNewLine } = this.props;

        if (didMountReCalcNewLine) {
            this.formatNewLine();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { vertical } = this.state;
        const { value } = this.props;

        if (prevProps.value !== value) {
            if (value === '') {
                this.setText('');
            }
        }

        if (prevState.vertical !== vertical) {
            this.formatNewLine();
        }
    }

    onChange = (e) => {
        const {
            onlyEnglishAndNum, dependWidthBr, maxLine,
        } = this.props;
        let info = null;

        if (onlyEnglishAndNum) {
            info = e.target.value.replace(/[\u3105-\u3129\u02CA\u02C7\u02CB\u02D9]/g, ''); // 英文、任何字符、\n、空白建
        } else {
            info = e.target.value;
        }

        /**
         * per 每幾個字換行
         */

        if (dependWidthBr) {
            const resultText = this.dependWidthNewLine(info);

            if (resultText.split('\n').length > maxLine) {
                return false;
            }

            this.setText(resultText);
        } else {
            this.normal(info);
        }
    }

    onKeyDown = (e) => {
        const { maxLine } = this.props;
        const { text } = this.state;

        if (e.keyCode === 8) {
            this.setState({ deleteCheck: true });
        }

        if (e.keyCode === 13) {
            const textBr = text.split('\n');
            if (textBr.length >= maxLine) {
                e.preventDefault();

                return false;
            }
        }
    }

    setText = (value) => {
        const { onChange } = this.props;
        this.setState({ text: value }, () => onChange(value));
    }

    getNewLine = (str) => {
        const { dependWidthBr } = this.props;
        let tempText = '';
        const res = [];

        for (let i = 0; i < str.length; i += 1) {
            if (this.textWidth(tempText) + this.textWidth(str[i]) > dependWidthBr) {
                res.push(tempText);
                tempText = '';
            }
            tempText += str[i];
        }

        if (tempText.length > 0) {
            res.push(tempText);
        }

        return res;
    };

    formatNewLine = () => {
        const { vertical, maxLine, value } = this.props;
        const nTxt = value.replace(/(\r\n|\n|\r)/gm, '');
        let nArr = this.getNewLine(nTxt);

        // 橫的
        if (!vertical && nArr.length > maxLine) {
            nArr = nArr.slice(0, maxLine);
        }

        this.setText(nArr.join('\n'));
    }

    calculateBr = (value) => {
        const { per, maxLine } = this.props;
        const { textArr, deleteCheck } = this.state;

        if (!per) return;
        let re = '';

        for (let i = 0, j = 1; i < value.length; i += 1, j += 1) {
            if (value[i] === '\n') {
                j = 0;
            }
            re += value[i];
            if (j && j % per === 0) {
                re += '\n';
            }
        }

        const ntextArr = re.split('\n');

        if (textArr[maxLine - 1] && !deleteCheck) {
            if (textArr[maxLine - 1].length === per && textArr.length > maxLine) return;
        }

        this.setState({
            text: value,
            textArr: ntextArr,
            deleteCheck: false,
        });
    }

    normal = (value) => {
        const { onChange } = this.props;
        this.setState({ text: value }, () => onChange(value));
    }

    dependWidthNewLine = (value) => {
        const { dependWidthBr } = this.props;

        const getBreak = (v) => {
            if (v === '') {
                return [];
            }

            const arr = [];
            let count = 0; // 實際字符個數計數
            let temp = -1; // 判斷換行。
            let lastCount = 0; // 每行最後的數目
            let stringText = '';

            // 計算
            for (let i = 0; i < v.length; i += 1) {
                count += 1;
                stringText += v[i];
                const cut = this.textWidth(v) > dependWidthBr ? count : 0;

                // 跳過
                if (temp !== -1 && cut !== temp) {
                    if (this.textWidth(stringText) > dependWidthBr) {
                        arr.push(lastCount);
                    }
                }

                temp = cut;
                lastCount = count;
            }

            return arr;
        };

        let dInfo = value;
        let resultInfo = '';
        let len = null;

        dInfo = dInfo.split('\n');
        len = dInfo.length;

        for (let i = 0; i < len; i += 1) {
            // 判斷每行是否 > maxCol
            const arr = getBreak(dInfo[i]);

            if (arr.length > 0) {
                const tempText = dInfo[i];
                let add = '';

                for (let j = 0; j < arr.length; j += 1) {
                    const sNum = j === 0 ? 0 : arr[j - 1];
                    const eNum = j === 0 ? arr[j] : arr[j] - arr[j - 1];
                    add += `${tempText.substr(sNum, eNum)}\n`;
                }
                // add += _temp.substr(arr[j - 1]);
                dInfo[i] = add;
            }
            // 組裝
            resultInfo += dInfo[i] + (i < len - 1 ? '\n' : '');
        }

        return resultInfo;
    };

    // 計算傳進來的字寬度
    textWidth = (text) => {
        const { fontStyle } = this.props;
        const canvas = document.createElement('canvas');
        const ctxt = canvas.getContext('2d');
        ctxt.font = fontStyle;

        return Math.floor(ctxt.measureText(text).width);
    };

    render() {
        const {
            customClassNames,
            isMaxText,
            maxLength,
            value = '',
        } = this.props;

        const { text = '' } = this.state;


        const brCount = text.match(new RegExp(/(\n)/g)) || [];
        const resultMaxLength = maxLength + brCount.length;

        return (

            <>
                <div className={styles.textAreaWrap}>
                    <textarea
                        ref={this.textAreaRef}
                        className={styles.textAreaSkin}
                        maxLength={maxLength ? resultMaxLength : null}
                        onChange={this.onChange}
                        onKeyDown={this.onKeyDown}
                        onKeyUp={this.onKeyUp}
                        value={text}
                    />
                    {isMaxText ? (
                        <span className={styles.textAreaMaxText}>
                            (
                            {text.replace(/\n/g, '').length}
                            /
                            {maxLength}
                            )
                        </span>
                    )
                        : null}
                </div>
            </>
        );
    }
}

