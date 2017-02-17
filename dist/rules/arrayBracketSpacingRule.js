"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("tslint");
var OPTION_ALWAYS = 'always';
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        var walker = new ArrayBracketSpacingWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.FAILURE_STRING = {
    noBeginningSpace: 'There should be no space after "["',
    noEndingSpace: 'There should be no space before "]"',
    requiredBeginningSpace: 'A space is required after "["',
    requiredEndingSpace: 'A space is required before "]"'
};
exports.Rule = Rule;
var ArrayBracketSpacingWalker = (function (_super) {
    __extends(ArrayBracketSpacingWalker, _super);
    function ArrayBracketSpacingWalker(sourceFile, options) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.singleValueException = false;
        _this.objectsInArraysException = false;
        _this.arraysInArraysException = false;
        var ruleOptions = _this.getOptions();
        _this.spaced = _this.hasOption(OPTION_ALWAYS) || (ruleOptions && ruleOptions.length === 0);
        if (ruleOptions[1]) {
            _this.singleValueException = typeof ruleOptions[1].singleValue !== 'undefined' && ruleOptions[1].singleValue !== _this.spaced;
            _this.objectsInArraysException = typeof ruleOptions[1].objectsInArrays !== 'undefined' && ruleOptions[1].objectsInArrays !== _this.spaced;
            _this.arraysInArraysException = typeof ruleOptions[1].arraysInArrays !== 'undefined' && ruleOptions[1].arraysInArrays !== _this.spaced;
        }
        return _this;
    }
    ArrayBracketSpacingWalker.prototype.visitNode = function (node) {
        if (node.kind === ts.SyntaxKind.ArrayBindingPattern) {
            this.validateSquareBrackets(node);
        }
        _super.prototype.visitNode.call(this, node);
    };
    ArrayBracketSpacingWalker.prototype.visitArrayLiteralExpression = function (node) {
        this.validateSquareBrackets(node);
        _super.prototype.visitArrayLiteralExpression.call(this, node);
    };
    ArrayBracketSpacingWalker.prototype.validateSquareBrackets = function (node) {
        var children = node.getChildren();
        var isSpaceAfterOpeningBracket = this.isSpaceBetween(children[0], children[1]);
        var isBreakAfterOpeningBracket = this.isLineBreakBetween(children[0], children[1]);
        var isSpaceBeforeClosingBracket = this.isSpaceBetween(children[children.length - 2], children[children.length - 1]);
        var isBreakBeforeClosingBracket = this.isLineBreakBetween(children[children.length - 2], children[children.length - 1]);
        var syntaxList = node.getChildren()[1];
        var itemsInArrayPattern = syntaxList.getChildren().filter(function (child) { return child.kind !== ts.SyntaxKind.CommaToken; });
        if (this.spaced && itemsInArrayPattern.length === 0) {
            return;
        }
        var openingBracketMustBeSpaced = (this.singleValueException && itemsInArrayPattern.length === 1) ||
            (this.arraysInArraysException && itemsInArrayPattern[0] && itemsInArrayPattern[0].kind === ts.SyntaxKind.ArrayLiteralExpression) ||
            (this.objectsInArraysException && itemsInArrayPattern[0] && itemsInArrayPattern[0].kind === ts.SyntaxKind.ObjectLiteralExpression)
            ? !this.spaced : this.spaced;
        var closingBracketMustBeSpaced = (this.singleValueException
            && itemsInArrayPattern.length === 1) ||
            (this.arraysInArraysException &&
                itemsInArrayPattern[itemsInArrayPattern.length - 1] &&
                itemsInArrayPattern[itemsInArrayPattern.length - 1].kind === ts.SyntaxKind.ArrayLiteralExpression) ||
            (this.objectsInArraysException
                && itemsInArrayPattern[itemsInArrayPattern.length - 1]
                && itemsInArrayPattern[itemsInArrayPattern.length - 1].kind === ts.SyntaxKind.ObjectLiteralExpression)
            ? !this.spaced : this.spaced;
        if (!isBreakAfterOpeningBracket) {
            if (openingBracketMustBeSpaced && !isSpaceAfterOpeningBracket) {
                var fix = this.createFix(this.appendText(node.getStart() + 1, ' '));
                this.addFailure(this.createFailure(node.getStart() + 1, 0, Rule.FAILURE_STRING.requiredBeginningSpace, fix));
            }
            if (!openingBracketMustBeSpaced && isSpaceAfterOpeningBracket) {
                var fix = this.createFix(this.deleteText(node.getStart() + 1, 1));
                this.addFailure(this.createFailure(node.getStart() + 1, 0, Rule.FAILURE_STRING.noBeginningSpace, fix));
            }
        }
        if (!isBreakBeforeClosingBracket) {
            if (closingBracketMustBeSpaced && !isSpaceBeforeClosingBracket) {
                var fix = this.createFix(this.appendText(node.getEnd() - 1, ' '));
                this.addFailure(this.createFailure(node.getEnd() - 1, 0, Rule.FAILURE_STRING.requiredEndingSpace, fix));
            }
            if (!closingBracketMustBeSpaced && isSpaceBeforeClosingBracket) {
                var fix = this.createFix(this.deleteText(node.getEnd() - 2, 1));
                this.addFailure(this.createFailure(node.getEnd() - 1, 0, Rule.FAILURE_STRING.noEndingSpace, fix));
            }
        }
    };
    ArrayBracketSpacingWalker.prototype.isSpaceBetween = function (node, nextNode) {
        return nextNode.getStart() - node.getEnd() > 0;
    };
    ArrayBracketSpacingWalker.prototype.isLineBreakBetween = function (node, nextNode) {
        return this.getEndPosition(node).line !== this.getStartPosition(nextNode).line;
    };
    ArrayBracketSpacingWalker.prototype.getStartPosition = function (node) {
        return node.getSourceFile().getLineAndCharacterOfPosition(node.getStart());
    };
    ArrayBracketSpacingWalker.prototype.getEndPosition = function (node) {
        return node.getSourceFile().getLineAndCharacterOfPosition(node.getEnd());
    };
    return ArrayBracketSpacingWalker;
}(Lint.RuleWalker));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL2FycmF5QnJhY2tldFNwYWNpbmdSdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLCtCQUFpQztBQUNqQyw2QkFBK0I7QUFFL0IsSUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDO0FBRS9CO0lBQTBCLHdCQUF1QjtJQUFqRDs7SUFZQSxDQUFDO0lBSlEsb0JBQUssR0FBWixVQUFhLFVBQXlCO1FBQ3BDLElBQU0sTUFBTSxHQUFHLElBQUkseUJBQXlCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQzVFLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFDSCxXQUFDO0FBQUQsQ0FaQSxBQVlDLENBWnlCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWTtBQUNqQyxtQkFBYyxHQUFHO0lBQzdCLGdCQUFnQixFQUFFLG9DQUFvQztJQUN0RCxhQUFhLEVBQUUscUNBQXFDO0lBQ3BELHNCQUFzQixFQUFFLCtCQUErQjtJQUN2RCxtQkFBbUIsRUFBRSxnQ0FBZ0M7Q0FDdEQsQ0FBQztBQU5TLG9CQUFJO0FBY2pCO0lBQXdDLDZDQUFlO0lBTXJELG1DQUFZLFVBQXlCLEVBQUUsT0FBc0I7UUFBN0QsWUFDRSxrQkFBTSxVQUFVLEVBQUUsT0FBTyxDQUFDLFNBUzNCO1FBZE8sMEJBQW9CLEdBQVksS0FBSyxDQUFDO1FBQ3RDLDhCQUF3QixHQUFZLEtBQUssQ0FBQztRQUMxQyw2QkFBdUIsR0FBWSxLQUFLLENBQUM7UUFJL0MsSUFBTSxXQUFXLEdBQUcsS0FBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3RDLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxXQUFXLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRXpGLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FB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QUcsQ0FBQyxDQUFDLENBQUM7WUFDMUcsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsMEJBQTBCLElBQUksMkJBQTJCLENBQUMsQ0FBQyxDQUFDO2dCQUMvRCxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNwRyxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFHTyxrREFBYyxHQUF0QixVQUF1QixJQUFhLEVBQUUsUUFBaUI7UUFDckQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFTyxzREFBa0IsR0FBMUIsVUFBMkIsSUFBYSxFQUFFLFFBQWlCO1FBQ3pELE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ2pGLENBQUM7SUFFTyxvREFBZ0IsR0FBeEIsVUFBeUIsSUFBYTtRQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLDZCQUE2QixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFFTyxrREFBYyxHQUF0QixVQUF1QixJQUFhO1FBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsNkJBQTZCLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUNILGdDQUFDO0FBQUQsQ0FwR0EsQUFvR0MsQ0FwR3VDLElBQUksQ0FBQyxVQUFVLEdBb0d0RCIsImZpbGUiOiJydWxlcy9hcnJheUJyYWNrZXRTcGFjaW5nUnVsZS5qcyIsInNvdXJjZVJvb3QiOiIvd29yay93b3Jrc3BhY2UvdHNsaW50LWVzbGludC1ydWxlcy9zcmMifQ==
