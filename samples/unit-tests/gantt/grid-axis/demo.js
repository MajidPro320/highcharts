/**
 * Tests the isOuterAxis() function
 */
QUnit.test('isOuterAxis()', function (assert) {
    var chart = Highcharts.chart('container', {
        chart: {
            type: 'bar'
        },
        xAxis: [{
            title: {
                text: 'First Axis'
            },
            grid: true
        }, {
            title: {
                text: 'Second Axis'
            },
            grid: true
        }, {
            title: {
                text: 'Third Axis'
            },
            grid: true,
            opposite: true
        }, {
            title: {
                text: 'Fourth Axis'
            },
            grid: true,
            opposite: true
        }],
        series: [{
            data: [129.9, 271.5, 306.4, -29.2, 544.0, 376.0, 435.6, 348.5],
            xAxis: 0
        }, {
            data: [29.9, -71.5, -106.4, -129.2, -144.0, -176.0, -135.6, -148.5],
            xAxis: 1
        }, {
            data: [129.9, 271.5, 306.4, -29.2, 544.0, 376.0, 435.6, 348.5],
            xAxis: 2
        }, {
            data: [29.9, -71.5, -106.4, -129.2, -144.0, -176.0, -135.6, -148.5],
            xAxis: 3
        }]
    });

    assert.ok(
        chart.xAxis[1].isOuterAxis(),
        'Lowermost bottom x-axis is outerAxis'
    );

    assert.notOk(
        chart.xAxis[2].isOuterAxis(),
        'Lowermost top x-axis is not outerAxis'
    );

    assert.ok(
        chart.xAxis[3].isOuterAxis(),
        'Topmost top x-axis is outerAxis'
    );
});

/**
 * Tests the additions to Highcharts.dateFormats
 */
QUnit.test('dateFormats', function (assert) {
    assert.equal(
        typeof Highcharts.dateFormats.W,
        'function',
        'Weeks format exists'
    );

    assert.equal(
        typeof Highcharts.dateFormats.E,
        'function',
        'Single character week day format exists'
    );

    assert.equal(
        Highcharts.dateFormats.W(Date.UTC(2016, 8, 15)), // September 15th 2016
        37,
        'Week format produces correct output'
    );

    assert.equal(
        Highcharts.dateFormats.E(Date.UTC(2016, 8, 15)), // September 15th 2016
        'T',
        'Signle character week day format produces correct output'
    );
});

/**
 * Tests the vertical linear axis horizontal placement
 */
QUnit.test('Vertical Linear axis horizontal placement', function (assert) {
    var chart,
        axes = [],
        error;

    // Chart 1
    chart = Highcharts.chart('container', {
        chart: {
            type: 'line'
        },
        yAxis: [{
            title: {
                text: 'First Axis'
            },
            grid: true,
            id: 'axis1'
        }, {
            title: {
                text: 'Second Axis'
            },
            grid: true,
            id: 'axis2'
        }, {
            title: {
                text: 'Third Axis'
            },
            grid: true,
            opposite: true,
            linkedTo: 0,
            id: 'axis3'
        }, {
            title: {
                text: 'Fourth Axis'
            },
            grid: true,
            opposite: true,
            linkedTo: 1,
            id: 'axis4'
        }],
        series: [{
            data: [129.9, 271.5, 306.4, -29.2, 544.0, 376.0, 435.6, 348.5],
            yAxis: 0
        }, {
            data: [29.9, -71.5, -106.4, -129.2, -144.0, -176.0, -135.6, -148.5],
            yAxis: 1
        }]
    });

    axes[0] = chart.yAxis[0].axisGroup.getBBox();
    axes[1] = chart.yAxis[1].axisGroup.getBBox();
    axes[2] = chart.yAxis[2].axisGroup.getBBox();
    axes[3] = chart.yAxis[3].axisGroup.getBBox();

    error = 0.00001;

    assert.close(
        axes[1].x + axes[1].width,
        axes[0].x,
        error,
        'Left outer linear axis horizontal placement'
    );

    assert.close(
        axes[3].x,
        axes[2].x + axes[2].width,
        error,
        'Right outer linear axis horizontal placement'
    );
});

/**
 * Tests the vertical datetime axis horizontal placement
 */
QUnit.test('Vertical Datetime axis horizontal placement', function (assert) {
    var chart,
        axes = [],
        error;

    chart = Highcharts.chart('container', {
        title: {
            type: 'scatter'
        },
        yAxis: [{
            title: {
                text: 'First Axis'
            },
            grid: true,
            id: 'axis1',
            tickInterval: 1000 * 60 * 60 * 24, // Day
            type: 'datetime',
            labels: {
                format: '{value:%E}',
                style: {
                    fontSize: '2em'
                }
            },
            min: Date.UTC(2014, 10, 18),
            max: Date.UTC(2014, 10, 21)
        }, {
            title: {
                text: 'Second Axis'
            },
            grid: true,
            id: 'axis2',
            tickInterval: 1000 * 60 * 60 * 24, // Day
            type: 'datetime',
            labels: {
                format: '{value:%E}',
                style: {
                    fontSize: '1em'
                }
            },
            linkedTo: 0
        }, {
            title: {
                text: 'Third Axis'
            },
            grid: true,
            id: 'axis3',
            opposite: true,
            tickInterval: 1000 * 60 * 60 * 24, // Day
            type: 'datetime',
            labels: {
                format: '{value:%E}',
                style: {
                    fontSize: '1em'
                }
            },
            linkedTo: 0
        }, {
            title: {
                text: 'Fourth Axis'
            },
            grid: true,
            id: 'axis4',
            opposite: true,
            tickInterval: 1000 * 60 * 60 * 24, // Day
            type: 'datetime',
            labels: {
                format: '{value:%E}',
                style: {
                    fontSize: '1em'
                }
            },
            linkedTo: 0
        }],
        series: [{
            name: 'Project 3',
            borderRadius: 10,
            data: [{
                x: 7,
                x2: 9,
                y: Date.UTC(2014, 10, 19)
            }, {
                x: 7,
                x2: 12,
                y: Date.UTC(2014, 10, 20)
            }, {
                x: 12,
                x2: 13,
                y: Date.UTC(2014, 10, 21)
            }]
        }]
    });

    axes[0] = chart.yAxis[0].axisGroup.getBBox();
    axes[1] = chart.yAxis[1].axisGroup.getBBox();
    axes[2] = chart.yAxis[2].axisGroup.getBBox();
    axes[3] = chart.yAxis[3].axisGroup.getBBox();

    error = 0.00001;

    assert.close(
        axes[1].x + axes[1].width,
        axes[0].x,
        error,
        'Left outer datetime axis horizontal placement'
    );

    assert.close(
        axes[3].x,
        axes[2].x + axes[2].width,
        error,
        'Right outer datetime axis horizontal placement'
    );
});

/**
 * Tests the horizontal linear axis vertical placement
 */
QUnit.test('Horizontal Linear axis vertical placement', function (assert) {
    var chart,
        axes = [],
        error;

    // Chart 1
    chart = Highcharts.chart('container', {
        chart: {
            type: 'line'
        },
        xAxis: [{
            title: {
                text: 'First Axis'
            },
            grid: true,
            id: 'axis1'
        }, {
            title: {
                text: 'Second Axis'
            },
            grid: true,
            id: 'axis2'
        }, {
            title: {
                text: 'Third Axis'
            },
            grid: true,
            opposite: true,
            linkedTo: 0,
            id: 'axis3'
        }, {
            title: {
                text: 'Fourth Axis'
            },
            grid: true,
            opposite: true,
            linkedTo: 1,
            id: 'axis4'
        }],
        series: [{
            data: [129.9, 271.5, 306.4, -29.2, 544.0, 376.0, 435.6, 348.5],
            xAxis: 0
        }, {
            data: [29.9, -71.5, -106.4, -129.2, -144.0, -176.0, -135.6, -148.5],
            xAxis: 1
        }]
    });

    axes[0] = chart.xAxis[0].axisGroup.getBBox();
    axes[1] = chart.xAxis[1].axisGroup.getBBox();
    axes[2] = chart.xAxis[2].axisGroup.getBBox();
    axes[3] = chart.xAxis[3].axisGroup.getBBox();

    error = 0.00001;

    assert.close(
        axes[1].y,
        axes[0].y + axes[0].height,
        error,
        'Bottom outer linear axis vertical placement'
    );

    assert.close(
        axes[3].y + axes[3].height,
        axes[2].y,
        error,
        'Top outer linear axis vertical placement'
    );
});

/**
 * Tests the horizontal datetime axis vertical placement
 */
QUnit.test('Horizontal Datetime axis vertical placement', function (assert) {
    var chart,
        axes = [],
        error;

    chart = Highcharts.chart('container', {
        title: {
            type: 'scatter'
        },
        xAxis: [{
            title: {
                text: 'First Axis'
            },
            grid: true,
            id: 'axis1',
            tickInterval: 1000 * 60 * 60 * 24, // Day
            type: 'datetime',
            labels: {
                format: '{value:%E}',
                style: {
                    fontSize: '2em'
                }
            },
            min: Date.UTC(2014, 10, 18),
            max: Date.UTC(2014, 10, 21)
        }, {
            title: {
                text: 'Second Axis'
            },
            grid: true,
            id: 'axis2',
            tickInterval: 1000 * 60 * 60 * 24, // Day
            type: 'datetime',
            labels: {
                format: '{value:%E}',
                style: {
                    fontSize: '1em'
                }
            },
            linkedTo: 0
        }, {
            title: {
                text: 'Third Axis'
            },
            grid: true,
            id: 'axis3',
            opposite: true,
            tickInterval: 1000 * 60 * 60 * 24, // Day
            type: 'datetime',
            labels: {
                format: '{value:%E}',
                style: {
                    fontSize: '1em'
                }
            },
            linkedTo: 0
        }, {
            title: {
                text: 'Fourth Axis'
            },
            grid: true,
            id: 'axis4',
            opposite: true,
            tickInterval: 1000 * 60 * 60 * 24, // Day
            type: 'datetime',
            labels: {
                format: '{value:%E}',
                style: {
                    fontSize: '1em'
                }
            },
            linkedTo: 0
        }],
        series: [{
            name: 'Project 3',
            borderRadius: 10,
            data: [{
                y: 0,
                x: Date.UTC(2014, 10, 19),
                x2: Date.UTC(2014, 10, 20)
            }, {
                y: 1,
                x: Date.UTC(2014, 10, 20),
                x2: Date.UTC(2014, 10, 21)
            }, {
                y: 2,
                x: Date.UTC(2014, 10, 21),
                x2: Date.UTC(2014, 10, 22)
            }]
        }]
    });

    axes[0] = chart.xAxis[0].axisGroup.getBBox();
    axes[1] = chart.xAxis[1].axisGroup.getBBox();
    axes[2] = chart.xAxis[2].axisGroup.getBBox();
    axes[3] = chart.xAxis[3].axisGroup.getBBox();

    error = 0.00001;

    assert.close(
        axes[1].y,
        axes[0].y + axes[0].height,
        error,
        'Bottom outer datetime axis vertical placement'
    );

    assert.close(
        axes[3].y + axes[3].height,
        axes[2].y,
        error,
        'Top outer datetime axis vertical placement'
    );
});

/**
 * Checks that datetime and linear axes for each series type (except 'pie')have
 * ticks placed at the start and end of the axis, creating a grid:
 *   ___________________
 *   |__|__|__|__|__|__|
 *   ^                 ^
 */
QUnit.test('Horizontal axis ticks at start and end', function (assert) {
    var chart,
        types = Highcharts.seriesTypes,
        // No grids for pies!
        ignoreTypes = ['pie'],
        ignore,
        type;

    chart = Highcharts.chart('container', {
        chart: {
            type: 'column'
        },
        xAxis: [{
            title: {
                text: 'First Axis'
            },
            grid: true
        }, {
            title: {
                text: 'Second Axis'
            },
            type: 'datetime',
            grid: true
        }, {
            title: {
                text: 'Third Axis'
            },
            grid: true,
            opposite: true
        }, {
            title: {
                text: 'Fourth Axis'
            },
            grid: true,
            type: 'datetime',
            opposite: true
        }],
        series: [{
            xAxis: 0,
            data: [[129.9, -29.2], [306.4, 271.5], [544.0, 376.0]]
        }, {
            xAxis: 1,
            data: [{
                x: Date.UTC(2016, 10, 12),
                y: 1
            }, {
                x: Date.UTC(2016, 10, 14),
                y: 2
            }]
        }, {
            xAxis: 2,
            data: [[-144.0, -176.0], [-106.4, -129.2], [29.9, -71.5]]
        }, {
            xAxis: 3,
            data: [{
                x: Date.UTC(2016, 10, 13),
                y: 1
            }, {
                x: Date.UTC(2016, 10, 15),
                y: 2
            }]
        }]
    });



    function test(type) {
        var axes,
            axis,
            $axisGroup,
            axisGroupBox,
            leftTick,
            rightTick,
            ticks,
            i;

        chart.options.chart.type = type;
        chart = Highcharts.chart('container', chart.options);

        axes = chart.xAxis;
        for (i = 0; i < axes.length; i++) {
            axis = axes[0];
            $axisGroup = $(axis.axisGroup.element);
            axisGroupBox = $axisGroup[0].getBBox();
            ticks = $axisGroup.find('.highcharts-tick');
            leftTick = ticks[0];
            rightTick = ticks.slice(-1)[0];

            assert.equal(
                leftTick.getBBox().x,
                axisGroupBox.x,
                type + ' chart leftmost tick is placed correctly'
            );

            assert.equal(
                rightTick.getBBox().x,
                axisGroupBox.x + axisGroupBox.width,
                type + ' chart rightmost tick is placed correctly'
            );
        }
    }

    types = {
        column: true
    };

    for (type in types) {
        if (types.hasOwnProperty(type)) {
            ignore = Highcharts.inArray(type, ignoreTypes) > -1;
            if (!ignore) {
                test(type);
            }
        }
    }
});

/**
 * Checks that the ticks in independent horizontal axes are equally distributed,
 * by checking that the space between the first and second tick is equal to the
 * second last and last tick:
 *
 *               _________________________
 * Avoid this:   |______|______|______|__|
 *                  ^                  ^
 *               _________________________
 * Want this:    |_____|_____|_____|_____|
 *                  ^                 ^
 *
 * It is however fine that ticks in axes which are linked to other axes are not
 * equally distributed, because they may not have the same tick interval as the
 * inner axes.
 */
QUnit.test('Horizontal axis ticks equally distributed', function (assert) {
    var chart,
        axes,
        i,
        axis,
        // There is often a 1px difference in spacing between ticks
        error = 1.00000000000001,
        ticks,
        $axisGroup,
        axisGroupBox,
        secondLeftmostTick,
        secondRightmostTick,
        axisLeftPoint,
        axisRightPoint,
        leftSpace,
        rightSpace;

    chart = Highcharts.chart('container', {
        chart: {
            type: 'scatter'
        },
        xAxis: [{
            title: {
                text: 'First Axis'
            },
            grid: true
        }, {
            title: {
                text: 'Second Axis'
            },
            type: 'datetime',
            grid: true
        }, {
            title: {
                text: 'Third Axis'
            },
            grid: true,
            opposite: true
        }, {
            title: {
                text: 'Fourth Axis'
            },
            grid: true,
            type: 'datetime',
            opposite: true
        }],
        series: [{
            xAxis: 0,
            data: [[1, 271.5], [2, -29.2], [3, 376.0]]
        }, {
            xAxis: 1,
            data: [{
                x: Date.UTC(2016, 10, 12),
                y: 1
            }, {
                x: Date.UTC(2016, 10, 14),
                y: 2
            }]
        }, {
            xAxis: 2,
            data: [[29.9, -71.5], [-106.4, -129.2], [-144.0, -176.0]]
        }, {
            xAxis: 3,
            data: [{
                x: Date.UTC(2016, 10, 13),
                y: 1
            }, {
                x: Date.UTC(2016, 10, 15),
                y: 2
            }]
        }]
    });

    axes = chart.xAxis;

    for (i = 0; i < axes.length; i++) {
        axis = axes[i];
        $axisGroup = $(axis.axisGroup.element);
        ticks = $axisGroup.find('.highcharts-tick');
        secondLeftmostTick = ticks[1];
        secondRightmostTick = ticks.slice(-2)[0];
        axisGroupBox = $axisGroup[0].getBBox();
        axisLeftPoint = axisGroupBox.x;
        axisRightPoint = axisGroupBox.x + axisGroupBox.width;
        leftSpace = secondLeftmostTick.getBBox().x - axisLeftPoint;
        rightSpace = axisRightPoint - secondRightmostTick.getBBox().x;

        assert.close(
            rightSpace,
            leftSpace,
            error,
            'Left space is equal to right space in xAxis[' + i + ']'
        );
    }
});

/**
 * Checks that the tick labels in horizontal axes are centered in their cells,
 * both vertically and horizontally. This is checked by asserting that the
 * midpoint of each tick label is the same as the midpoint between the tick it
 * belongs to, and the next one.
 *
 *                        _________________________________
 *                        |       |       |   3   |       |
 * Avoid any of these:    |      1|2      |       |       |
 *                        |_______|_______|_______|___4___|
 *
 *                        _________________________________
 *                        |       |       |       |       |
 * Want this:             |   1   |   2   |   3   |   4   |
 *                        |_______|_______|_______|_______|
 */
QUnit.test('Horizontal axis tick labels centered', function (assert) {
    var chart,
        axes,
        xError = 1.1,
        yError = 1.1;

    chart = Highcharts.chart('container', {
        chart: {
            type: 'scatter'
        },
        xAxis: [{
            title: {
                text: 'First Axis'
            },
            grid: true
        }, {
            title: {
                text: 'Second Axis'
            },
            type: 'datetime',
            min: Date.UTC(2016, 10, 11),
            max: Date.UTC(2016, 10, 15),
            tickInterval: 1000 * 60 * 60 * 24, // Day
            grid: true
        }, {
            title: {
                text: 'Third Axis'
            },
            grid: true,
            opposite: true
        }, {
            title: {
                text: 'Fourth Axis'
            },
            grid: true,
            type: 'datetime',
            min: Date.UTC(2016, 10, 12),
            max: Date.UTC(2016, 10, 16),
            tickInterval: 1000 * 60 * 60 * 24 * 7, // Week
            opposite: true
        }],
        series: [{
            xAxis: 0,
            data: [[1, 271.5], [2, -29.2], [3, 376.0]]
        }, {
            xAxis: 1,
            data: [{
                x: Date.UTC(2016, 10, 12),
                y: 1
            }, {
                x: Date.UTC(2016, 10, 14),
                y: 2
            }]
        }, {
            xAxis: 2,
            data: [[29.9, -71.5], [-106.4, -129.2], [-144.0, -176.0]]
        }, {
            xAxis: 3,
            data: [{
                x: Date.UTC(2016, 10, 13),
                y: 1
            }, {
                x: Date.UTC(2016, 10, 15),
                y: 2
            }]
        }]
    });

    axes = chart.xAxis;

    Highcharts.each(axes, function (axis) {
        var axisType = axis.options.type || 'linear',
            tickPositions = axis.tickPositions,
            ticks = axis.ticks,
            tick,
            nextTick,
            tickBox,
            nextTickBox,
            labelBox,
            actual,
            expected,
            i;

        if (!axisType) {
            if (axis.options.categories) {
                axisType = 'categories';
            } else {
                axisType = 'linear';
            }
        }

        for (i = 0; i < tickPositions.length; i++) {
            tick = ticks[tickPositions[i]];
            nextTick = ticks[tickPositions[i + 1]];
            if (tick.mark && tick.label && nextTick && nextTick.mark) {
                tickBox = tick.mark.element.getBBox();
                nextTickBox = nextTick.mark.element.getBBox();
                labelBox = tick.label.element.getBBox();
                expected = {
                    x: (nextTickBox.x + tickBox.x) / 2,
                    y: tickBox.y + (tickBox.height / 2)
                };
                actual = {
                    x: labelBox.x + (labelBox.width / 2),
                    y: labelBox.y + (labelBox.height / 2)
                };

                assert.close(
                    actual.x,
                    expected.x,
                    xError,
                    axisType + ' tick label x position correct'
                );

                assert.close(
                    actual.y,
                    expected.y,
                    yError,
                    axisType + ' tick label y position correct'
                );
            }
        }
    });
});

/**
 * Checks that the tick labels in vertical axes are centered in their cells,
 * both vertically and horizontally. This is checked by asserting that the
 * midpoint of each tick label is the same as the midpoint between the tick it
 * belongs to, and the next one.
 *
 *                        _________
 *                        |       |
 *                        |      1|
 *                        |_______|
 *                        |       |
 *                        |2      |
 * Avoid any of these:    |_______|
 *                        |   3   |
 *                        |       |
 *                        |_______|
 *                        |       |
 *                        |       |
 *                        |___4___|
 *
 *                        _________
 *                        |       |
 *                        |   1   |
 *                        |_______|
 *                        |       |
 *                        |   2   |
 * Want this:             |_______|
 *                        |       |
 *                        |   3   |
 *                        |_______|
 *                        |       |
 *                        |   4   |
 *                        |_______|
 */
QUnit.test('Vertical axis tick labels centered', function (assert) {
    var chart,
        axes,
        xError = 1.1,
        yError = 1.4;

    chart = Highcharts.chart('container', {
        chart: {
            type: 'scatter'
        },
        yAxis: [{
            title: {
                text: 'First Axis'
            },
            grid: true
        }, {
            title: {
                text: 'Second Axis'
            },
            type: 'datetime',
            min: Date.UTC(2016, 10, 11),
            max: Date.UTC(2016, 10, 15),
            tickInterval: 1000 * 60 * 60 * 24, // Day
            grid: true
        }, {
            title: {
                text: 'Third Axis'
            },
            grid: true,
            opposite: true
        }, {
            title: {
                text: 'Fourth Axis'
            },
            grid: true,
            type: 'datetime',
            min: Date.UTC(2016, 10, 12),
            max: Date.UTC(2016, 10, 16),
            tickInterval: 1000 * 60 * 60 * 24 * 7, // Week
            opposite: true
        }],
        series: [{
            yAxis: 0,
            data: [[271.5, 1], [-29.2, 2], [376.0, 3]]
        }, {
            yAxis: 1,
            data: [{
                x: 1,
                y: Date.UTC(2016, 10, 12)
            }, {
                x: 2,
                y: Date.UTC(2016, 10, 14)
            }]
        }, {
            yAxis: 2,
            data: [[-71.5, 29.9], [-129.2, -106.4], [-176.0, -144.0]]
        }, {
            yAxis: 3,
            data: [{
                x: 1,
                y: Date.UTC(2016, 10, 13)
            }, {
                x: 2,
                y: Date.UTC(2016, 10, 15)
            }]
        }]
    });

    axes = chart.yAxis;

    Highcharts.each(axes, function (axis) {
        var axisType = axis.options.type,
            tickPositions = axis.tickPositions,
            ticks = axis.ticks,
            tick,
            nextTick,
            tickBox,
            nextTickBox,
            oppositeTick,
            labelBox,
            actual,
            expected,
            i;

        if (!axisType) {
            if (axis.options.categories) {
                axisType = 'categories';
            } else {
                axisType = 'linear';
            }
        }

        for (i = 0; i < tickPositions.length; i++) {
            tick = ticks[tickPositions[i]];
            tickPositions.reverse();
            oppositeTick = ticks[tickPositions[i + 1]];
            if (oppositeTick && oppositeTick.label) {
                labelBox = oppositeTick.label.element.getBBox();
            }
            tickPositions.reverse();
            nextTick = ticks[tickPositions[i + 1]];
            if (tick.mark && labelBox && nextTick && nextTick.mark) {
                tickBox = tick.mark.element.getBBox();
                nextTickBox = nextTick.mark.element.getBBox();

                expected = {
                    x: tickBox.x + (tickBox.width / 2),
                    y: (tickBox.y + nextTickBox.y) / 2
                };
                actual = {
                    x: labelBox.x + (labelBox.width / 2),
                    y: labelBox.y + (labelBox.height / 2)
                };

                assert.close(
                    actual.x,
                    expected.x,
                    xError,
                    axisType + ' tick label x position correct'
                );

                assert.close(
                    actual.y,
                    expected.y,
                    yError,
                    axisType + ' tick label y position correct'
                );
            }
        }
    });
});

/**
 * Checks that all points are placed according to label, and not tick.
 *                       _________________________
 *                       |       |       |       |
 *                       |   1   |   2   |   3   |
 *                       |_______|_______|_______|
 *                       |   |       |       |   |
 * Avoid any of these:   |     val=1   val=3     |
 *                       |   |       |       |   |
 *
 *                       _________________________
 *                       |       |       |       |
 *                       |   1   |   2   |   3   |
 *                       |_______|_______|_______|
 *                       |   |       |       |   |
 * Want this:            | val=1   val=2   val=3 |
 *                       |   |       |       |   |
 *
 */
QUnit.test('Points placed according to label', function (assert) {
    var chart;
    chart = Highcharts.chart('container', {
        chart: {
            type: 'scatter'
        },
        xAxis: [{
            title: {
                text: 'xAxis'
            },
            grid: true,
            tickInterval: 1
        }],
        yAxis: [{
            title: {
                text: 'yAxis'
            },
            grid: true,
            tickInterval: 1
        }],
        series: [{
            data: [[1, 1], [2, 2], [3, 3]]
        }]

    });
    Highcharts.each(chart.series, function (series) {
        var xAxis = series.xAxis,
            xAxisType = xAxis.options.type,
            yAxis = series.yAxis,
            yAxisType = yAxis.options.type;

        if (!xAxisType) {
            if (xAxis.options.categories) {
                xAxisType = 'categories';
            } else {
                xAxisType = 'linear';
            }
        }

        if (!yAxisType) {
            if (yAxis.options.categories) {
                yAxisType = 'categories';
            } else {
                yAxisType = 'linear';
            }
        }

        Highcharts.each(series.points, function (point, index) {
            var pointBox = point.graphic.getBBox(),
                pointX = pointBox.x + (pointBox.width / 2),
                pointY = pointBox.y + (pointBox.height / 2),

                xAxisTick = xAxis.ticks[xAxis.tickPositions[index]],
                xAxisLabelBox = xAxisTick.label.getBBox(),
                xAxisLabelX = xAxisLabelBox.x,
                xAxisLabelY = xAxisLabelBox.y,

                yAxisTick = yAxis.ticks[yAxis.tickPositions[index]],
                yAxisLabelBox = yAxisTick.label.getBBox(),
                yAxisLabelX = yAxisLabelBox.x,
                yAxisLabelY = yAxisLabelBox.y;

            console.log(xAxisTick.label.element);

            assert.equal(
                pointX,
                xAxisLabelX,
                xAxisType + ' x-axis point x position correct'
            );
            assert.equal(
                pointY,
                xAxisLabelY,
                xAxisType + ' x-axis point y position correct'
            );
            assert.equal(
                pointX,
                yAxisLabelX,
                yAxisType + ' y-axis point x position correct'
            );
            assert.equal(
                pointY,
                yAxisLabelY,
                yAxisType + ' y-axis point y position correct'
            );
        });
    });
});
