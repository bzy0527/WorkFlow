/**
 * Class: Connectors.Flowchart
 * Provides 'flowchart' connectors, consisting of vertical and horizontal line segments.
 */
/**
 * Function: Constructor
 *
 * Parameters:
 * 	stub - minimum length for the stub at each end of the connector. defaults to 30 pixels.
 */
jsPlumb.Connectors.Flowchart = function(params) {
    params = params || {};
    var self = this,
        minStubLength = params.stub || params.minStubLength /* bwds compat. */ || 30,
        segments = [],
        segmentGradients = [],
        segmentProportions = [],
        segmentLengths = [],
        segmentProportionalLengths = [],
        points = [],
        swapX,
        swapY,
        /**
         * recalculates the gradients of each segment, and the points at which the segments begin, proportional to the total length travelled
         * by all the segments that constitute the connector.
         */
        updateSegmentGradientsAndProportions = function(startX, startY, endX, endY) {
            var total = 0;
            for (var i = 0; i < segments.length; i++) {
                var sx = i == 0 ? startX : segments[i][2],
                    sy = i == 0 ? startY : segments[i][3],
                    ex = segments[i][0],
                    ey = segments[i][1];

                segmentGradients[i] = sx == ex ? Infinity : 0;
                segmentLengths[i] = Math.abs(sx == ex ? ey - sy : ex - sx);
                total += segmentLengths[i];
            }
            var curLoc = 0;
            for (var i = 0; i < segments.length; i++) {
                segmentProportionalLengths[i] = segmentLengths[i] / total;
                segmentProportions[i] = [curLoc, (curLoc += (segmentLengths[i] / total)) ];
            }
        },
        appendSegmentsToPoints = function() {
            points.push(segments.length);
            for (var i = 0; i < segments.length; i++) {
                points.push(segments[i][0]);
                points.push(segments[i][1]);
            }
        },
        /**
         * helper method to add a segment.
         */
        addSegment = function(x, y, sx, sy, tx, ty) {
            var lx = segments.length == 0 ? sx : segments[segments.length - 1][0];
            var ly = segments.length == 0 ? sy : segments[segments.length - 1][1];
            segments.push([x, y, lx, ly]);
        },
        /**
         * returns [segment, proportion of travel in segment, segment index] for the segment
         * that contains the point which is 'location' distance along the entire path, where
         * 'location' is a decimal between 0 and 1 inclusive. in this connector type, paths
         * are made up of a list of segments, each of which contributes some fraction to
         * the total length.
         */
        findSegmentForLocation = function(location) {
            var idx = segmentProportions.length - 1, inSegmentProportion = 0;
            for (var i = 0; i < segmentProportions.length; i++) {
                if (segmentProportions[i][1] >= location) {
                    idx = i;
                    inSegmentProportion = (location - segmentProportions[i][0]) / segmentProportionalLengths[i];
                    break;
                }
            }
            return { segment:segments[idx], proportion:inSegmentProportion, index:idx };
        };

    this.compute = function(sourcePos, targetPos, sourceAnchor, targetAnchor, lineWidth, minWidth) {

        segments = [];
        segmentGradients = [];
        segmentProportionalLengths = [];
        segmentLengths = [];
        segmentProportionals = [];

        swapX = targetPos[0] < sourcePos[0];
        swapY = targetPos[1] < sourcePos[1];

        var lw = lineWidth || 1,
            offx = (lw / 2) + (minStubLength * 2),
            offy = (lw / 2) + (minStubLength * 2),
            so = sourceAnchor.orientation || sourceAnchor.getOrientation(),
            to = targetAnchor.orientation || targetAnchor.getOrientation(),
            x = swapX ? targetPos[0] : sourcePos[0],
            y = swapY ? targetPos[1] : sourcePos[1],
            w = Math.abs(targetPos[0] - sourcePos[0]) + 2*offx,
            h = Math.abs(targetPos[1] - sourcePos[1]) + 2*offy;
        if (w < minWidth) {
            offx += (minWidth - w) / 2;
            w = minWidth;
        }
        if (h < minWidth) {
            offy += (minWidth - h) / 2;
            h = minWidth;
        }
        var sx = swapX ? w-offx  : offx,
            sy = swapY ? h-offy  : offy,
            tx = swapX ? offx : w-offx ,
            ty = swapY ? offy : h-offy,
            startStubX = sx + (so[0] * minStubLength),
            startStubY = sy + (so[1] * minStubLength),
            endStubX = tx + (to[0] * minStubLength),
            endStubY = ty + (to[1] * minStubLength),
            midx = startStubX + ((endStubX - startStubX) / 2),
            midy = startStubY + ((endStubY - startStubY) / 2);

        x -= offx; y -= offy;
        points = [x, y, w, h, sx, sy, tx, ty], extraPoints = [];

        addSegment(startStubX, startStubY, sx, sy, tx, ty);

        if (so[0] == 0) {
            var startStubIsBeforeEndStub = startStubY < endStubY;
            // when start point's stub is less than endpoint's stub
            if (startStubIsBeforeEndStub) {
                addSegment(startStubX, midy, sx, sy, tx, ty);
                addSegment(midx, midy, sx, sy, tx, ty);
                addSegment(endStubX, midy, sx, sy, tx, ty);
            } else {
                // when start point's stub is greater than endpoint's stub
                addSegment(midx, startStubY, sx, sy, tx, ty);
                addSegment(midx, endStubY, sx, sy, tx, ty);
            }
        }
        else {
            var startStubIsBeforeEndStub = startStubX < endStubX;
            // when start point's stub is less than endpoint's stub
            if (startStubIsBeforeEndStub) {
                addSegment(midx, startStubY, sx, sy, tx, ty);
                addSegment(midx, midy, sx, sy, tx, ty);
                addSegment(midx, endStubY, sx, sy, tx, ty);
            } else {
                // when start point's stub is greater than endpoint's stub
                addSegment(startStubX, midy, sx, sy, tx, ty);
                addSegment(endStubX, midy, sx, sy, tx, ty);
            }
        }

        addSegment(endStubX, endStubY, sx, sy, tx, ty);
        addSegment(tx, ty, sx, sy, tx, ty);

        appendSegmentsToPoints();
        updateSegmentGradientsAndProportions(sx, sy, tx, ty);

        return points;
    };

    /**
     * returns the point on the connector's path that is 'location' along the length of the path, where 'location' is a decimal from
     * 0 to 1 inclusive. for this connector we must first figure out which segment the given point lies in, and then compute the x,y position
     * from our knowledge of the segment's start and end points.
     */
    this.pointOnPath = function(location) {
        return self.pointAlongPathFrom(location, 0);
    };

    /**
     * returns the gradient of the connector at the given point; the gradient will be either 0 or Infinity, depending on the direction of the
     * segment the point falls in. segment gradients are calculated in the compute method.
     */
    this.gradientAtPoint = function(location) {
        return segmentGradients[findSegmentForLocation(location)["index"]];
    };

    /**
     * returns the point on the connector's path that is 'distance' along the length of the path from 'location', where
     * 'location' is a decimal from 0 to 1 inclusive, and 'distance' is a number of pixels.  when you consider this concept from the point of view
     * of this connector, it starts to become clear that there's a problem with the overlay paint code: given that this connector makes several
     * 90 degree turns, it's entirely possible that an arrow overlay could be forced to paint itself around a corner, which would look stupid. this is
     * because jsPlumb uses this method (and pointOnPath) so determine the locations of the various points that go to make up an overlay.  a better
     * solution would probably be to just use pointOnPath along with gradientAtPoint, and draw the overlay so that its axis ran along
     * a tangent to the connector.  for straight line connectors this would obviously mean the overlay was painted directly on the connector, since a
     * tangent to a straight line is the line itself, which is what we want; for this connector, and for beziers, the results would probably be better.  an additional
     * advantage is, of course, that there's less computation involved doing it that way.
     */
    this.pointAlongPathFrom = function(location, distance) {
        var s = findSegmentForLocation(location), seg = s.segment, p = s.proportion, sl = segmentLengths[s.index], m = segmentGradients[s.index];
        var e = {
            x 	: m == Infinity ? seg[2] : seg[2] > seg[0] ? seg[0] + ((1 - p) * sl) - distance : seg[2] + (p * sl) + distance,
            y 	: m == 0 ? seg[3] : seg[3] > seg[1] ? seg[1] + ((1 - p) * sl) - distance  : seg[3] + (p * sl) + distance,
            segmentInfo : s
        };

        return e;
    };

    /**
     * calculates a line that is perpendicular to, and centered on, the path at 'distance' pixels from the given location.
     * the line is 'length' pixels long.
     */
    this.perpendicularToPathAt = function(location, length, distance) {
        var p = self.pointAlongPathFrom(location, distance);
        var m = segmentGradients[p.segmentInfo.index];
        var _theta2 = Math.atan(-1 / m);
        var y =  length / 2 * Math.sin(_theta2);
        var x =  length / 2 * Math.cos(_theta2);
        return [{x:p.x + x, y:p.y + y}, {x:p.x - x, y:p.y - y}];

    };

    var addSegment = function(x, y, sx, sy, tx, ty) {
        var lx = segments.length == 0 ? sx : segments[segments.length - 1][0];
        var ly = segments.length == 0 ? sy : segments[segments.length - 1][1];
        segments.push([x, y, lx, ly]);
    }

    var appendSegmentsToPoints = function() {
        points.push(segments.length);
        for (var i = 0; i < segments.length; i++) {
            points.push(segments[i][0]);
            points.push(segments[i][1]);
        }
    }

    var updateSegmentGradientsAndProportions = function(startX, startY, endX, endY) {
        var total = 0;
        for (var i = 0; i < segments.length; i++) {
            var sx = i == 0 ? startX : segments[i][2],
                sy = i == 0 ? startY : segments[i][3],
                ex = segments[i][0],
                ey = segments[i][1];

            segmentGradients[i] = sx == ex ? Infinity : 0;
            segmentLengths[i] = Math.abs(sx == ex ? ey - sy : ex - sx);
            total += segmentLengths[i];
        }
        var curLoc = 0;
        for (var i = 0; i < segments.length; i++) {
            segmentProportionalLengths[i] = segmentLengths[i] / total;
            segmentProportions[i] = [curLoc, (curLoc += (segmentLengths[i] / total)) ];
        }
    }
};



this.compute = function(sourcePos, targetPos, sourceAnchor, targetAnchor, lineWidth, minWidth) {
    //计算两个点间的宽高
    var w = Math.abs(sourcePos[0] - targetPos[0]);
    var h = Math.abs(sourcePos[1] - targetPos[1]);
    var widthAdjusted = false, heightAdjusted = false;
    // these are padding to ensure the whole connector line appears
    var xo = 0.45 * w, yo = 0.45 * h;
    // these are padding to ensure the whole connector line appears
    w *= 1.9; h *=1.9;

    var x = Math.min(sourcePos[0], targetPos[0]) - xo;
    var y = Math.min(sourcePos[1], targetPos[1]) - yo;

    // minimum size is 2 * line Width if minWidth was not given.
    var calculatedMinWidth = Math.max(2 * lineWidth, minWidth);

    if (w < calculatedMinWidth) {
        w = calculatedMinWidth;
        x = sourcePos[0]  + ((targetPos[0] - sourcePos[0]) / 2) - (calculatedMinWidth / 2);
        xo = (w - Math.abs(sourcePos[0]-targetPos[0])) / 2;
    }
    if (h < calculatedMinWidth) {
        h = calculatedMinWidth;
        y = sourcePos[1]  + ((targetPos[1] - sourcePos[1]) / 2) - (calculatedMinWidth / 2);
        yo = (h - Math.abs(sourcePos[1]-targetPos[1])) / 2;
    }

    _sx = sourcePos[0] < targetPos[0] ?  xo : w-xo;
    _sy = sourcePos[1] < targetPos[1] ? yo:h-yo;
    _tx = sourcePos[0] < targetPos[0] ? w-xo : xo;
    _ty = sourcePos[1] < targetPos[1] ? h-yo : yo;
    currentPoints = [ x, y, w, h, _sx, _sy, _tx, _ty ];
    _dx = _tx - _sx, _dy = (_ty - _sy);
    _m = _dy / _dx, _m2 = -1 / _m;
    _b = -1 * ((_m * _sx) - _sy);
    _theta = Math.atan(_m); _theta2 = Math.atan(_m2);

    return currentPoints;
};

this.compute = function(sourcePos, targetPos, sourceAnchor, targetAnchor, lineWidth, minWidth)
{
    lineWidth = lineWidth || 0;
    _w = Math.abs(sourcePos[0] - targetPos[0]) + lineWidth;
    _h = Math.abs(sourcePos[1] - targetPos[1]) + lineWidth;
    _canvasX = Math.min(sourcePos[0], targetPos[0])-(lineWidth/2);
    _canvasY = Math.min(sourcePos[1], targetPos[1])-(lineWidth/2);
    _sx = sourcePos[0] < targetPos[0] ? _w - (lineWidth/2): (lineWidth/2);
    _sy = sourcePos[1] < targetPos[1] ? _h - (lineWidth/2) : (lineWidth/2);
    _tx = sourcePos[0] < targetPos[0] ? (lineWidth/2) : _w - (lineWidth/2);
    _ty = sourcePos[1] < targetPos[1] ? (lineWidth/2) : _h - (lineWidth/2);
    _CP = self._findControlPoint([_sx,_sy], sourcePos, targetPos, sourceAnchor, targetAnchor);
    _CP2 = self._findControlPoint([_tx,_ty], targetPos, sourcePos, targetAnchor, sourceAnchor);
    var minx1 = Math.min(_sx,_tx); var minx2 = Math.min(_CP[0], _CP2[0]); var minx = Math.min(minx1,minx2);
    var maxx1 = Math.max(_sx,_tx); var maxx2 = Math.max(_CP[0], _CP2[0]); var maxx = Math.max(maxx1,maxx2);

    if (maxx > _w) _w = maxx;
    if (minx < 0) {
        _canvasX += minx; var ox = Math.abs(minx);
        _w += ox; _CP[0] += ox; _sx += ox; _tx +=ox; _CP2[0] += ox;
    }

    var miny1 = Math.min(_sy,_ty); var miny2 = Math.min(_CP[1], _CP2[1]); var miny = Math.min(miny1,miny2);
    var maxy1 = Math.max(_sy,_ty); var maxy2 = Math.max(_CP[1], _CP2[1]); var maxy = Math.max(maxy1,maxy2);
    if (maxy > _h) _h = maxy;
    if (miny < 0) {
        _canvasY += miny; var oy = Math.abs(miny);
        _h += oy; _CP[1] += oy; _sy += oy; _ty +=oy; _CP2[1] += oy;
    }

    if (minWidth && _w < minWidth) {
        var posAdjust = (minWidth - _w) / 2;
        _w = minWidth;
        _canvasX -= posAdjust; _sx = _sx + posAdjust ; _tx = _tx + posAdjust; _CP[0] =  _CP[0] + posAdjust; _CP2[0] = _CP2[0] + posAdjust;
    }

    if (minWidth && _h < minWidth) {
        var posAdjust = (minWidth - _h) / 2;
        _h = minWidth;
        _canvasY -= posAdjust; _sy = _sy + posAdjust ; _ty = _ty + posAdjust; _CP[1] =  _CP[1] + posAdjust; _CP2[1] = _CP2[1] + posAdjust;
    }

    currentPoints = [_canvasX, _canvasY, _w, _h, _sx, _sy, _tx, _ty, _CP[0], _CP[1], _CP2[0], _CP2[1] ];
    return currentPoints;
};

{

    var svgAttributeMap = {
        "stroke-linejoin":"stroke-linejoin",
        "joinstyle":"stroke-linejoin",
        "stroke-dashoffset":"stroke-dashoffset"
    };

    var ns = {
            svg:"http://www.w3.org/2000/svg",
            xhtml:"http://www.w3.org/1999/xhtml"
        },
        _attr = function(node, attributes) {
            for (var i in attributes)
                node.setAttribute(i, "" + attributes[i]);
        },
        _node = function(name, attributes) {
            var n = document.createElementNS(ns.svg, name);
            attributes = attributes || {};
            attributes["version"] = "1.1";
            attributes["xmnls"] = ns.xhtml;
            _attr(n, attributes);
            return n;
        },
        _pos = function(d) { return "position:absolute;left:" + d[0] + "px;top:" + d[1] + "px"; },
        _convertStyle = function(s, ignoreAlpha) {
            var o = s,
                pad = function(n) { return n.length == 1 ? "0" + n : n; },
                hex = function(k) { return pad(Number(k).toString(16)); },
                pattern = /(rgb[a]?\()(.*)(\))/;
            if (s.match(pattern)) {
                var parts = s.match(pattern)[2].split(",");
                o = "#" + hex(parts[0]) + hex(parts[1]) + hex(parts[2]);
                if (!ignoreAlpha && parts.length == 4)
                    o = o + hex(parts[3]);
            }

            return o;
        },
        _clearGradient = function(parent) {
            for (var i = 0; i < parent.childNodes.length; i++) {
                if (parent.childNodes[i].tagName == "linearGradient" || parent.childNodes[i].tagName == "radialGradient")
                    parent.removeChild(parent.childNodes[i]);
            }
        },
        _updateGradient = function(parent, node, style, dimensions) {
            var id = "jsplumb_gradient_" + (new Date()).getTime();
            // first clear out any existing gradient
            _clearGradient(parent);
            // this checks for an 'offset' property in the gradient, and in the absence of it, assumes
            // we want a linear gradient. if it's there, we create a radial gradient.
            // it is possible that a more explicit means of defining the gradient type would be
            // better. relying on 'offset' means that we can never have a radial gradient that uses
            // some default offset, for instance.
            if (!style.gradient.offset) {
                var g = _node("linearGradient", {id:id});
                parent.appendChild(g);
            }
            else {
                var g = _node("radialGradient", {
                    id:id
                });
                parent.appendChild(g);
            }

            // the svg radial gradient seems to treat stops in the reverse
            // order to how canvas does it.  so we want to keep all the maths the same, but
            // iterate the actual style declarations in reverse order, if the x indexes are not in order.
            for (var i = 0; i < style.gradient.stops.length; i++) {
                // Straight Connectors and Bezier connectors act slightly differently; this code is a bit of a kludge.  but next version of
                // jsplumb will be replacing both Straight and Bezier to be generic instances of 'Connector', which has a list of segments.
                // so, not too concerned about leaving this in for now.
                var styleToUse = i;
                if (dimensions.length == 8)
                    styleToUse = dimensions[4] < dimensions[6] ? i: style.gradient.stops.length - 1 - i;
                else
                    styleToUse = dimensions[4] < dimensions[6] ? style.gradient.stops.length - 1 - i : i;
                var stopColor = _convertStyle(style.gradient.stops[styleToUse][1], true);
                var s = _node("stop", {"offset":Math.floor(style.gradient.stops[i][0] * 100) + "%", "stop-color":stopColor});
                g.appendChild(s);
            }
            var applyGradientTo = style.strokeStyle ? "stroke" : "fill";
            node.setAttribute("style", applyGradientTo + ":url(#" + id + ")");
        },
        _applyStyles = function(parent, node, style, dimensions) {

            if (style.gradient) {
                _updateGradient(parent, node, style, dimensions);
            }
            else {
                // make sure we clear any existing gradient
                _clearGradient(parent);
                node.setAttribute("style", "");
            }

            node.setAttribute("fill", style.fillStyle ? _convertStyle(style.fillStyle, true) : "none");
            node.setAttribute("stroke", style.strokeStyle ? _convertStyle(style.strokeStyle, true) : "none");
            if (style.lineWidth) {
                node.setAttribute("stroke-width", style.lineWidth);
            }

            // in SVG there is a stroke-dasharray attribute we can set, and its syntax looks like
            // the syntax in VML but is actually kind of nasty: values are given in the pixel
            // coordinate space, whereas in VML they are multiples of the width of the stroked
            // line, which makes a lot more sense.  for that reason, jsPlumb is supporting both
            // the native svg 'stroke-dasharray' attribute, and also the 'dashstyle' concept from
            // VML, which will be the preferred method.  the code below this converts a dashstyle
            // attribute given in terms of stroke width into a pixel representation, by using the
            // stroke's lineWidth.
            if(style["stroke-dasharray"]) {
                node.setAttribute("stroke-dasharray", style["stroke-dasharray"]);
            }
            if (style["dashstyle"] && style["lineWidth"]) {
                var sep = style["dashstyle"].indexOf(",") == -1 ? " " : ",",
                    parts = style["dashstyle"].split(sep),
                    styleToUse = "";
                parts.forEach(function(p) {
                    styleToUse += (Math.floor(p * style.lineWidth) + sep);
                });
                node.setAttribute("stroke-dasharray", styleToUse);
            }

            // extra attributes such as join type, dash offset.
            for (var i in svgAttributeMap) {
                if (style[i]) {
                    node.setAttribute(svgAttributeMap[i], style[i]);
                }
            }
        },
        _decodeFont = function(f) {
            var r = /([0-9].)(p[xt])\s(.*)/;
            var bits = f.match(r);
            return {size:bits[1] + bits[2], font:bits[3]};
        };

    /*
     * Base class for SVG components.
     */
    var SvgComponent = function(cssClass, originalArgs, pointerEventsSpec) {
        var self = this;
        pointerEventsSpec = pointerEventsSpec || "all";
        jsPlumb.jsPlumbUIComponent.apply(this, originalArgs);
        self.canvas = null, self.path = null, self.svg = null;

        this.setHover = function() { };

        self.canvas = document.createElement("div");
        self.canvas.style["position"] = "absolute";
        jsPlumb.sizeCanvas(self.canvas,0,0,1,1);

        var clazz = cssClass + " " + (originalArgs[0].cssClass || "");

        self.svg = _node("svg", {
            "style":"",
            "width":0,
            "height":0,
            "pointer-events":pointerEventsSpec,
            "class": clazz
        });

        jsPlumb.appendElement(self.canvas, originalArgs[0]["parent"]);
        self.canvas.appendChild(self.svg);

        // TODO this displayElement stuff is common between all components, across all
        // renderers.  would be best moved to jsPlumbUIComponent.
        var displayElements = [ self.canvas ];
        this.getDisplayElements = function() {
            return displayElements;
        };

        this.appendDisplayElement = function(el) {
            displayElements.push(el);
        };

        this.paint = function(d, style, anchor) {
            if (style != null) {
                jsPlumb.sizeCanvas(self.canvas, d[0], d[1], d[2], d[3]);
                _attr(self.svg, {
                    "style":_pos([0,0,d[2], d[3]]),
                    "width": d[2],
                    "height": d[3]
                });
                self._paint.apply(this, arguments);
            }
        };
    };

    /*
     * Base class for SVG connectors.
     */
    var SvgConnector = function(params) {
        var self = this;
        SvgComponent.apply(this, [ params["_jsPlumb"].connectorClass, arguments, "none" ]);
        this._paint = function(d, style) {
            var p = self.getPath(d), a = { "d":p }, outlineStyle = null;
            a["pointer-events"] = "all";

            // outline style.  actually means drawing an svg object underneath the main one.
            if (style.outlineColor) {
                var outlineWidth = style.outlineWidth || 1,
                    outlineStrokeWidth = style.lineWidth + (2 * outlineWidth);
                outlineStyle = {
                    strokeStyle:_convertStyle(style.outlineColor),
                    lineWidth:outlineStrokeWidth
                };

                if (self.bgPath == null) {
                    self.bgPath = _node("path", a);
                    self.svg.appendChild(self.bgPath);
                    self.attachListeners(self.bgPath, self);
                }
                else {
                    _attr(self.bgPath, a);
                }

                _applyStyles(self.svg, self.bgPath, outlineStyle, d);
            }


            if (self.path == null) {
                self.path = _node("path", a);
                self.svg.appendChild(self.path);
                self.attachListeners(self.path, self);
            }
            else {
                _attr(self.path, a);
            }

            _applyStyles(self.svg, self.path, style, d);
        };
    };

    /*
     * SVG Bezier Connector
     */
    jsPlumb.Connectors.svg.Bezier = function(params) {
        jsPlumb.Connectors.Bezier.apply(this, arguments);
        SvgConnector.apply(this, arguments);
        this.getPath = function(d) { return "M " + d[4] + " " + d[5] + " C " + d[8] + " " + d[9] + " " + d[10] + " " + d[11] + " " + d[6] + " " + d[7]; };
    };

    /*
     * SVG straight line Connector
     */
    jsPlumb.Connectors.svg.Straight = function(params) {
        jsPlumb.Connectors.Straight.apply(this, arguments);
        SvgConnector.apply(this, arguments);
        this.getPath = function(d) { return "M " + d[4] + " " + d[5] + " L " + d[6] + " " + d[7]; };
    };

    jsPlumb.Connectors.svg.Flowchart = function() {
        var self = this;
        jsPlumb.Connectors.Flowchart.apply(this, arguments);
        SvgConnector.apply(this, arguments);
        this.getPath = function(dimensions) {
            var p = "M " + dimensions[4] + "," + dimensions[5];
            // loop through extra points
            for (var i = 0; i < dimensions[8]; i++) {
                p = p + " L " + dimensions[9 + (i*2)] + " " + dimensions[10 + (i*2)];
            }
            // finally draw a line to the end
            p = p  + " " + dimensions[6] + "," +  dimensions[7];
            return p;
        };
    };

    /*
	 * Base class for SVG endpoints.
	 */
    var SvgEndpoint = function(params) {
        var self = this;
        SvgComponent.apply(this, [ params["_jsPlumb"].endpointClass, arguments, "all" ]);
        this._paint = function(d, style) {
            var s = jsPlumb.extend({}, style);
            if (s.outlineColor) {
                s.strokeWidth = s.outlineWidth;
                s.strokeStyle = _convertStyle(s.outlineColor, true);
            }

            if (self.node == null) {
                self.node = self.makeNode(d, s);
                self.svg.appendChild(self.node);
                self.attachListeners(self.node, self);
            }
            _applyStyles(self.svg, self.node, s, d);
            _pos(self.node, d);
        };
    };

    /*
     * SVG Dot Endpoint
     */
    jsPlumb.Endpoints.svg.Dot = function() {
        jsPlumb.Endpoints.Dot.apply(this, arguments);
        SvgEndpoint.apply(this, arguments);
        this.makeNode = function(d, style) {
            return _node("circle", {
                "cx"	:	d[2] / 2,
                "cy"	:	d[3] / 2,
                "r"		:	d[2] / 2
            });
        };
    };

    /*
     * SVG Rectangle Endpoint
     */
    jsPlumb.Endpoints.svg.Rectangle = function() {
        jsPlumb.Endpoints.Rectangle.apply(this, arguments);
        SvgEndpoint.apply(this, arguments);
        this.makeNode = function(d, style) {
            return _node("rect", {
                "width":d[2],
                "height":d[3]
            });
        };
    };

    /*
     * SVG Image Endpoint is the default image endpoint.
     */
    jsPlumb.Endpoints.svg.Image = jsPlumb.Endpoints.Image;
    /*
     * Blank endpoint in svg renderer is the default Blank endpoint.
     */
    jsPlumb.Endpoints.svg.Blank = jsPlumb.Endpoints.Blank;
    /*
     * Label endpoint in svg renderer is the default Label endpoint.
     */
    jsPlumb.Overlays.svg.Label = jsPlumb.Overlays.Label;


    var AbstractSvgArrowOverlay = function(superclass, originalArgs) {
        superclass.apply(this, originalArgs);
        jsPlumb.jsPlumbUIComponent.apply(this, originalArgs);
        var self = this, path =null;
        this.paint = function(connector, d, lineWidth, strokeStyle, fillStyle) {
            if (path == null) {
                path = _node("path");
                connector.svg.appendChild(path);
                self.attachListeners(path, connector);
                self.attachListeners(path, self);
            }

            _attr(path, {
                "d"		:	makePath(d),
                stroke 	: 	strokeStyle ? strokeStyle : null,
                fill 	: 	fillStyle ? fillStyle : null
            });
        };
        var makePath = function(d) {
            return "M" + d.hxy.x + "," + d.hxy.y +
                " L" + d.tail[0].x + "," + d.tail[0].y +
                " L" + d.cxy.x + "," + d.cxy.y +
                " L" + d.tail[1].x + "," + d.tail[1].y +
                " L" + d.hxy.x + "," + d.hxy.y;
        };
    };

    jsPlumb.Overlays.svg.Arrow = function() {
        AbstractSvgArrowOverlay.apply(this, [jsPlumb.Overlays.Arrow, arguments]);
    };

    jsPlumb.Overlays.svg.PlainArrow = function() {
        AbstractSvgArrowOverlay.apply(this, [jsPlumb.Overlays.PlainArrow, arguments]);
    };

    jsPlumb.Overlays.svg.Diamond = function() {
        AbstractSvgArrowOverlay.apply(this, [jsPlumb.Overlays.Diamond, arguments]);
    };

    /**
     * 计算路径
     * @param segment
     * @param isFirstSegment
     * @returns {*}
     */
    var getPath = function (segment, isFirstSegment) {
        return ({
            "Straight": function (isFirstSegment) {
                var d = segment.getCoordinates();
                return (isFirstSegment ? "M " + d.x1 + " " + d.y1 + " " : "") + "L " + d.x2 + " " + d.y2;
            },
            "Bezier": function (isFirstSegment) {
                var d = segment.params;
                return (isFirstSegment ? "M " + d.x2 + " " + d.y2 + " " : "") +
                    "C " + d.cp2x + " " + d.cp2y + " " + d.cp1x + " " + d.cp1y + " " + d.x1 + " " + d.y1;
            },
            "Arc": function (isFirstSegment) {
                var d = segment.params,
                    laf = segment.sweep > Math.PI ? 1 : 0,
                    sf = segment.anticlockwise ? 0 : 1;

                return  (isFirstSegment ? "M" + segment.x1 + " " + segment.y1  + " " : "")  + "A " + segment.radius + " " + d.r + " 0 " + laf + "," + sf + " " + segment.x2 + " " + segment.y2;
            }
        })[segment.type](isFirstSegment);
    }
}