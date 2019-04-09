export function Graph(elem) {
    this._root = elem;
    this._visible = {};
    this._graph = {};
    this._scroll = {};
    this._mode = 'day';
    this._chart = [];
    this._setSize = function (start) {
        this._width = this._root.clientWidth * 0.9;
        this._height = this._root.clientHeight * 0.7;
        this._positions = {
            "offsetLeft": this._root.offsetLeft,
            "clientWidth": this._root.clientWidth,
            "clientHeight": this._root.clientHeight
        };
        this._offsetX = this._root.offsetLeft + this._root.clientWidth * 0.05;
        this._graph = {
            ...this._graph,
            'YScale': {
                ...this._graph.YScale,
                'height': this._height * 0.63
            },
            'XScale': {
                ...this._graph.XScale,
                'width': this._width,
                'height': this._height * 0.07
            },
            'chart': {
                'line': {
                    'strokeWidth': this._width * this._height * 0.00001
                }
            },
            'width': this._width,
            'height': this._height * 0.7
        }

        this._scroll = {
            ...this._scroll,
            'XScale': {
                ...this._scroll.XScale,
                'width': this._width,
            },
            'YScale': {
                ...this._scroll.YScale,
                'height': this._height * 0.08,
            },
            'chart': {
                'line': {
                    'strokeWidth': this._width * 20 * 0.000065
                }
            },
        };
        if (start) {
            this._graph = {
                ...this._graph,
                'YScale': {
                    ...this._graph.YScale,
                    'min': 0,
                    'incriment': 50,
                    'axis': {
                        'numberDevision': 5,
                        'textY': [],
                        'axis': null
                    }

                },
                'XScale': {
                    ...this._graph.XScale,
                    'min': 0,
                    'max': 20,
                    'incriment': 50,
                    'axis': {
                        'numberDevision': 5,
                        'textX': [],
                        'axis': null
                    },
                },
            }

            this._scroll = {
                ...this._scroll,
                'XScale': {
                    ...this._scroll.XScale,
                    'min': 0,
                    'max': 300
                },
                'YScale': {
                    ...this._scroll.YScale,
                    'min': 0,
                    'max': 300,
                },
                'eventIndicator': {
                    'back': {
                        'down': false,
                        'move': false
                    },
                    'changeBuffer': {
                        'down': false,
                        'move': false,
                        'side': 0
                    }
                },
                'minBufferSize': 10,
                'changeBuffersize': 1,
            };
        }
    }
    this._setSize(true);
    window.addEventListener("resize", (event) => {
        this._checkSize()
    });
    this._html = document.createElement('div');
    this._html.className = 'graphMain';
    preventSelection(this._html);
    this._createIntfc = function (elem) {
        const graphArea = document.createElement('div');
        const buttons = document.createElement('div');
        buttons.className = 'buttons';
        graphArea.className = 'graphArea';
        const graph = this._graph;
        const scroll = this._scroll;
        const graphTitle = document.createElement('p');
        graphTitle.className = 'graphTitle';
        graphTitle.innerHTML = 'Graph name';
        const themeButton = document.createElement('a');
        themeButton.className = 'themeButton';
        themeButton.value = this._mode;
        themeButton.innerHTML = this._mode === 'day' ? 'Switch to Night Mode' : 'Switch to Day Mode';
        themeButton.onclick = this._clickThemeButton;
        graph.html = this.createSvg('svg', {
            'class': 'graph',
        });
        scroll.html = this.createSvg('svg', {
            'class': 'scroll',
        });
        var chart_gr = this.createSvg('g', {
            'class': 'chart',
        });
        var chart_sc = this.createSvg('g', {
            'class': 'chart',
        });
        const roller = this.createSvg('path', {
            'class': 'roller',
            'd': `M0,0 ${scroll.XScale.width},0 ${scroll.XScale.width},${scroll.YScale.height} 0,${scroll.YScale.height}Z`
        });
        const back = this.createSvg('path', {
            'class': 'back',
            'd': `M0,0 ${scroll.XScale.width},0 ${scroll.XScale.width},${scroll.YScale.height} 0,${scroll.YScale.height}Z`
        });
        const changeBuffer = this.createSvg('path', {
            'class': 'changeBuffer'
        });
        const dy = graph.YScale.height / (graph.YScale.axis.numberDevision + 1);
        let y = '';
        for (let i = 1; i < graph.YScale.axis.numberDevision + 1; i++) {
            y += `M0,${i* dy} ${graph.XScale.width},${i* dy} `;
        }
        const axisY = this.createSvg('path', {
            'class': 'axisY',
            'd': '' + y
        });
        graph.YScale.axis.axis = axisY;
        roller.onclick = this._clickScroll;
        back.addEventListener('mousedown', this._rollerMouseDown);
        changeBuffer.addEventListener('mousedown', this._rollerMouseDown);
        window.addEventListener('mouseup', this._rollerMouseUp);
        window.addEventListener('mousemove', this._rollerMouseMove);
        back.addEventListener('touchstart', this._rollerMouseDown);
        changeBuffer.addEventListener('touchstart', this._rollerMouseDown);
        window.addEventListener('touchend', this._rollerMouseUp);
        window.addEventListener('touchmove', this._rollerMouseMove);
        graphArea.appendChild(graph.html);
        graphArea.appendChild(scroll.html);
        graph.html.appendChild(axisY);
        graph.html.appendChild(chart_gr);
        scroll.html.appendChild(chart_sc);
        scroll.html.appendChild(back);
        scroll.html.appendChild(roller);
        scroll.html.appendChild(changeBuffer);
        elem.appendChild(graphTitle);
        elem.appendChild(graphArea);
        elem.appendChild(buttons);
        elem.appendChild(themeButton);
        for (let i = 1; i < this._data.columns.length; i++) {
            const key = this._data.names[this._data.columns[i][0]];
            this._visible[key] = true;
            buttons.innerHTML += `<div class ='switch'>
                                <button class ='switchButton' value ='true'>&#10004</button>
                                <span>${key}</span>
                            </div>`;
        }
        const btn = buttons.getElementsByTagName('BUTTON');
        for (let i = 0; i < btn.length; i++) {
            btn[i].onclick = this._clickBtn;
        }
        for (let i = 0; i < buttons.children.length; i++) {
            buttons.children[i].onmousedown = 'return false';
            buttons.children[i].ondblclick = 'return false';
        }
        this._renderRoller();
    };

    this._data;
    this._checkSize = (event) => {
        for (let key in this._positions) {
            if (this._root[key] != this._positions[key]) {
                const back = this._html.getElementsByClassName('back')[0];
                const roller = this._html.getElementsByClassName('roller')[0];
                this._setSize(false);
                const dy = this._graph.YScale.height / (this._graph.YScale.axis.numberDevision + 1);
                let y = '';
                for (let i = 1; i < this._graph.YScale.axis.numberDevision + 1; i++) {
                    y += `M0,${i* dy} ${this._graph.XScale.width},${i* dy} `;
                }
                const frame = `M0,0 ${this._scroll.XScale.width},0 ${this._scroll.XScale.width},${this._scroll.YScale.height} 0,${this._scroll.YScale.height}Z`;
                back.setAttributeNS(null, 'd', frame);
                roller.setAttributeNS(null, 'd', frame);
                this._graph.YScale.axis.axis.setAttributeNS(null, 'd', y);
                this._clearGraph(this._scroll.html, this._graph.html);
                this._renderRoller();
                this._drow();
            }
        }
    }
    this._renderRoller = function () {
        const roller = this._html.getElementsByClassName('roller')[0];
        const changeBuffer = this._html.getElementsByClassName('changeBuffer')[0];
        const {
            XScale
        } = this._graph;
        const {
            YScale
        } = this._scroll;
        const norm = XScale.width / (this.formatX.length - 1);
        const offsetBuf = norm * this._scroll.changeBuffersize;
        const xStart = (XScale.min + this._scroll.changeBuffersize) * norm;
        const xEnd = (XScale.max - 1 - this._scroll.changeBuffersize) * norm;
        const rol = `${xEnd},${YScale.height-0.5} ${xEnd},0.5 ${xStart},0.5 ${xStart},${YScale.height-0.5}`;
        const change = `M${xEnd+offsetBuf},0 ${xEnd+offsetBuf},${YScale.height} ${xStart-offsetBuf},${YScale.height} ${xStart-offsetBuf},0Z M${rol}Z`;
        const d = roller.getAttributeNS(null, 'd').match(/M[^M]+/g);
        roller.setAttributeNS(null, 'd', `${d[0]} M${rol}Z`);
        changeBuffer.setAttributeNS(null, 'd', change);
    }

    this.setData = function (data) {
        this._html.innerHTML = '';
        this._data = {
            ...data
        };
        this.formatX = data.columns[0].map((element, index) => {
            return index !== 0 ?
                new Date(element).toLocaleString('en-US', {
                    'month': 'short',
                    'day': 'numeric'
                }) :
                element;
        });
        this._scroll.changeBuffersize = Math.floor((this.formatX.length - 1) / 50);
        this._scroll.minBufferSize = Math.floor((this.formatX.length - 1) / 10);
        this._graph.XScale.max = this._scroll.minBufferSize;
        this._scroll.XScale.max = this.formatX.length;
        this._graph.XScale.min = 0;
        this._scroll.XScale.min = 0;
    };

    this.rendering = function () {
        this._createIntfc(this._html);
        this._drow();
        this._root.appendChild(this._html);
    };

    this._drow = function () {
        this._processingData(this._graph);
        this._processingData(this._scroll);
        this._createAxis();
    };

    this._clickScroll = event => {
        this._moveScroll(event);
    }
    this._moveScroll = function (event) {
        const bufferSize = this._graph.XScale.max - this._graph.XScale.min;
        const offsetX = ('targetTouches' in event) ? event.targetTouches[0].clientX - this._offsetX : event.clientX - this._offsetX;
        let position = Math.floor(offsetX / this._scroll.XScale.width * (this._scroll.XScale.max - this._scroll.XScale.min) - bufferSize / 2);
        if (position + bufferSize > this._scroll.XScale.max) {
            position = this._scroll.XScale.max - bufferSize;
        } else if (position < 0) {
            position = 0;
        }
        this._graph.XScale.min = position;
        this._graph.XScale.max = position + bufferSize;
        this._renderRoller();
        this._clearGraph(this._graph.html);
        this._processingData(this._graph);
        this._createAxis();
    }
    this._rollerMouseDown = event => {
        this._scroll.eventIndicator[event.target.className.baseVal].down = true;
        if (event.target.className.baseVal === 'changeBuffer') {
            const offsetX = ('targetTouches' in event) ? event.targetTouches[0].clientX - this._offsetX : event.clientX - this._offsetX;
            const position = offsetX / this._scroll.XScale.width * (this._scroll.XScale.max - this._scroll.XScale.min);
            if (position > (this._graph.XScale.max - this._scroll.changeBuffersize * 2 - 2) || position < (this._graph.XScale.min + this._scroll.changeBuffersize + 1)) {
                this._scroll.eventIndicator.changeBuffer.side = (position + this._scroll.changeBuffersize * 2 < this._graph.XScale.max) ? 0 : 1;
            } else {
                this._scroll.eventIndicator[event.target.className.baseVal].down = false;
            }
        }
    }

    this._rollerMouseUp = event => {
        if (this._scroll.eventIndicator.back.down) {
            this._scroll.eventIndicator.back.down = false;
        }
        if (this._scroll.eventIndicator.changeBuffer.down) {
            this._scroll.eventIndicator.changeBuffer.down = false;
        }
    }
    this._rollerMouseMove = event => {
        if (this._scroll.eventIndicator.back.down) {
            this._moveScroll(event);
        }
        if (this._scroll.eventIndicator.changeBuffer.down) {
            this._changeBufferMove(event);
        }
    }
    this._changeBufferMove = function (event) {
        const offsetX = ('targetTouches' in event) ? event.targetTouches[0].clientX - this._offsetX : event.clientX - this._offsetX;
        let position = offsetX / this._scroll.XScale.width * (this._scroll.XScale.max - this._scroll.XScale.min);
        if (this._scroll.eventIndicator.changeBuffer.side) {
            position = Math.ceil(position)
            if (position - this._graph.XScale.min >= this._scroll.minBufferSize) {
                this._graph.XScale.max = position <= this._scroll.XScale.max ? position : this._scroll.XScale.max;
            }
        } else {
            position = Math.floor(position)
            if (this._graph.XScale.max - position >= this._scroll.minBufferSize) {
                this._graph.XScale.min = position >= 0 ? position : 0;
            }
        }
        this._renderRoller();
        this._clearGraph(this._graph.html);
        this._processingData(this._graph);
        this._createAxis();
    }

    this._clearGraph = function () {
        const graphs = arguments;
        for (let j = 1; j < this._data.columns.length; j++) {
            const name = this._data.names[this._data.columns[j][0]];
            if (this._visible[name]) {
                for (let i = 0; i < graphs.length; i++) {
                    const chart=graphs[i].getElementsByClassName('chart')[0];
                   chart.removeChild(chart.getElementsByClassName(name)[0]);
                }
            }
        };
    }
    this._clickThemeButton = event => {
        const root = document.getElementsByClassName('root')[0];
        const graphMains = document.getElementsByClassName('graphMain');
        const themeButtons = document.getElementsByClassName('themeButton');
        if (event.target.value === 'day') {
            for (var i = 0; i < themeButtons.length; i++) {
                themeButtons[i].innerHTML = 'Switch to Day Mode';
                themeButtons[i].value = 'night';
            }
            if (root.className.match('day')) {
                root.className = root.className.replace('day', 'night');
            } else {
                root.className += ' night';
            }
            if (this._html.className.match('day')) {
                for (var i = 0; i < graphMains.length; i++) {
                    graphMains[i].className = graphMains[i].className.replace('day', 'night');;
                }
            } else {
                for (var i = 0; i < graphMains.length; i++) {
                    graphMains[i].className += ' night';
                }
            }
        } else if (event.target.value === 'night') {
            for (var i = 0; i < themeButtons.length; i++) {
                themeButtons[i].innerHTML = 'Switch to Night Mode';
                themeButtons[i].value = 'day';
            }
            root.className = root.className.replace('night', 'day');
            for (var i = 0; i < graphMains.length; i++) {
                graphMains[i].className = graphMains[i].className.replace('night', 'day');
            }
        }
    }
    this._clickBtn = event => {
        const key = event.target.parentNode.children[1].innerHTML;
        event.target.value = event.target.value === 'true' ? 'false' : 'true';
        this._clearGraph(this._scroll.html, this._graph.html);
        this._visible[key] = !this._visible[key];
        this._drow();
    }
    this._processingData = function (plot) {
        this._updateYScale(plot);
        const {
            html,
            XScale,
            YScale
        } = plot;
        const chart = html.getElementsByClassName('chart')[0];
        for (let j = 1; j < this._data.columns.length; j++) {
            const key = this._data.names[this._data.columns[j][0]];
            if (this._visible[key]) {
                let points = '';
                for (let i = XScale.min; i < XScale.max - 1; i++) {
                    points += `${((i-XScale.min)/ (XScale.max -2- XScale.min)) * XScale.width},${((YScale.max -this._data.columns[j][i+1]) /YScale.max) *YScale.height} `;
                }
                const polyline = this.createSvg('polyline', {
                    'points': points,
                    'stroke': this._data.colors[this._data.columns[j][0]],
                    'strokeWidth': plot.chart.line.strokeWidth,
                    'fill': 'none',
                    'class': key
                });
                chart.appendChild(polyline);
            }
        }
    };

    this._createAxis = function () {
        const {
            YScale,
            XScale,
            html
        } = this._graph;
        YScale.incriment = Math.floor(YScale.max / (YScale.axis.numberDevision + 1));
        XScale.incriment = Math.floor(XScale.max / XScale.axis.numberDevision);
        const normX = (XScale.max - XScale.min) / XScale.width;
        let [textX, textY] = [
            [],
            []
        ];
        const textAxisY = html.getElementsByClassName('textAxisY');
        const textAxisX = html.getElementsByClassName('textAxisX');
        const textSize = XScale.height * 0.6;
        for (let i = 0; textAxisX.length; i++) {
            html.removeChild(textAxisX[0]);
        }
        for (let i = 0; textAxisY.length; i++) {
            html.removeChild(textAxisY[0]);
        }
        for (let i = 0; i <= YScale.axis.numberDevision; i++) {
            textY.push(this.createSvg('text', {
                'class': 'textAxisY',
                'x': 0,
                'y': YScale.height * (1 - (i) / (YScale.axis.numberDevision + 1)),
                'style': `font-size:${textSize}px`
            }))
            textY[i].textContent = i * YScale.incriment;
            html.appendChild(textY[i]);
        }
        const widthText = textSize * 3;
        let count = XScale.axis.numberDevision + 1;
        while ((widthText * count) > XScale.width) {
            count = (widthText * count) > XScale.width ? count - 1 : count;
        }
        const distance = (XScale.width - widthText * count) / (count - 1);
        let x = 0;
        const y = this._graph.height - textSize / 2;
        for (let i = 0; i <= count - 1; i++) {
            // i = ((i * XScale.incriment) > (this.formatX.length - 1)) ? this.formatX.length - 1 : i;
            let index;
            if (i) {
                x += widthText + distance;
                if (i < count - 1) {
                    index = Math.round(XScale.min + (x - widthText / 2) * normX);
                } else {
                    x = XScale.width - textSize * 3.2;
                    index = XScale.max - 1;
                }
            } else {
                x = 0;
                index = XScale.min + 1;
            }
            textX.push(this.createSvg('text', {
                'class': 'textAxisX',
                'x': x,
                'y': y,
                'style': `font-size:${textSize}px`
            }))
            textX[i].textContent = this.formatX[index];
            html.appendChild(textX[i]);
        }
        XScale.textX = textX;
        YScale.textY = textY;
    }

    this._updateYScale = function (scale) {
        const {
            XScale,
            YScale
        } = scale;
        let max = 0;
        let min = 0;
        for (let i = 1; i < this._data.columns.length; i++) {
            const key = this._data.names[this._data.columns[i][0]];
            if (this._visible[key]) {
                for (let j = XScale.min; j < XScale.max; j++) {
                    min = min > this._data.columns[i][j] ? this._data.columns[i][j] : min;
                    max = max < this._data.columns[i][j] ? this._data.columns[i][j] : max;
                }
            }
        }
        scale.YScale = {
            ...YScale,
            min,
            max
        };
    };

    this.createSvg = function (tagName, params) {
        tagName = document.createElementNS('http://www.w3.org/2000/svg', tagName);
        for (let p in params)
            tagName.setAttributeNS(
                null,
                p.replace(/[A-Z]/g, function (m, p, o, s) {
                    return '-' + m.toLowerCase();
                }),
                params[p]
            );
        return tagName;
    };


    function preventSelection(element) {
        let preventSelection = false;

        function addHandler(element, event, handler) {
            if (element.addEventListener)
                element.addEventListener(event, handler, false);
        }

        function removeSelection() {
            if (window.getSelection) {
                window.getSelection().removeAllRanges();
            } else if (document.selection && document.selection.clear)
                document.selection.clear();
        }

        addHandler(element, 'mousemove', function () {
            if (preventSelection)
                removeSelection();
        });
        addHandler(element, 'mousedown', function (event) {
            let ev = event || window.event;
            let sender = ev.target || ev.srcElement;
            preventSelection = !sender.tagName.match(/INPUT|TEXTAREA/i);
        });
    }

}