const chevrotain = require("chevrotain");
const Lexer = chevrotain.Lexer;
const createToken = chevrotain.createToken;

// the vocabulary will be exported and used in the Parser definition.
const tokenVocabulary = {};

const WhiteSpace = createToken({
    name: 'WhiteSpace',
    pattern: /\s+/,
    group: Lexer.SKIPPED
});

const String = createToken({
    name: 'String',
    pattern: /"(""|[^"])*"/
});

const SingleQuotedString = createToken({
    name: 'SingleQuotedString',
    pattern: /'(''|[^'])*'/
});

const RefSheetQuoted = createToken({
    name: 'RefSheetQuoted',
    pattern: /'((?![\\\/\[\]*?:]).)+?'(?=!)/
});

const Function = createToken({
    name: 'Function',
    name: 'Function',
    pattern: /[A-Za-z]+[A-Za-z_0-9.]+(?=[(])/
});

const FormulaError = createToken({
    name: 'Error',
    pattern: /#NULL!|#DIV\/0!|#VALUE!|#NAME\?|#NUM!|#N\/A/
});

const RefError = createToken({
    name: 'RefError',
    pattern: /#REF!/
});

const Cell = createToken({
    name: 'Cell',
    pattern: /[$]?[A-Za-z]{1,4}[$]?[1-9][0-9]*/
});

const RangeColumn = createToken({
    name: 'RangeColumn',
    pattern: /[$]?[A-Za-z]{1,4}:[$]?[A-Za-z]{1,4}/
});

const RangeRow = createToken({
    name: 'RangeRow',
    pattern: /[$]?[1-9][0-9]*:[$]?[1-9][0-9]*/
});

const Sheet = createToken({
    name: 'Sheet',
    pattern: /[A-Za-z_.\d]+(?=[!])/
});

const Variable = createToken({
    name: 'Variable',
    pattern: /[a-zA-Z_][a-zA-Z0-9_.?]+/
});

const Number = createToken({
    name: 'Number',
    pattern: /[0-9]+[.]?[0-9]*/
});

const Boolean = createToken({
    name: 'Boolean',
    pattern: /TRUE|FALSE/
});

const Array = createToken({
    name: 'Array',
    pattern: /{([\w,;\s]*)?}/
});

/**
 * Symbols and operators
 */
const At = createToken({
    name: 'At',
    pattern: /@/
});

const Comma = createToken({
    name: 'Comma',
    pattern: /,/
});

const Colon = createToken({
    name: 'Colon',
    pattern: /:/
});

const Semicolon = createToken({
    name: 'Semicolon',
    pattern: /;/
});

const OpenParen = createToken({
    name: 'OpenParen',
    pattern: /\(/
});

const CloseParen = createToken({
    name: 'CloseParen',
    pattern: /\)/
});

const OpenSquareParen = createToken({
    name: 'OpenSquareParen',
    pattern: /\[/
});

const CloseSquareParen = createToken({
    name: 'CloseSquareParen',
    pattern: /]/
});

const ExclamationMark = createToken({
    name: 'exclamationMark',
    pattern: /!/
});

const OpenCurlyParen  = createToken({
    name: 'OpenCurlyParen ',
    pattern: /{/
});

const CloseCurlyParen = createToken({
    name: 'CloseCurlyParen',
    pattern: /}/
});

const QuoteS = createToken({
    name: 'QuoteS',
    pattern: /'/
});


const MulOp = createToken({
    name: 'MulOp',
    pattern: /\*/
});

const PlusOp = createToken({
    name: 'PlusOp',
    pattern: /\+/
});

const DivOp = createToken({
    name: 'DivOp',
    pattern: /\//
});

const MinOp = createToken({
    name: 'MinOp',
    pattern: /-/
});

const ConcateOp = createToken({
    name: 'ConcateOp',
    pattern: /&/
});

const ExOp = createToken({
    name: 'ExOp',
    pattern: /\^/
});

const IntersectOp = createToken({
    name: 'IntersectOp',
    pattern: / /
});

const PercentOp = createToken({
    name: 'PercentOp',
    pattern: /%/
});

const GtOp = createToken({
    name: 'GtOp',
    pattern: />/
});

const EqOp = createToken({
    name: 'EqOp',
    pattern: /=/
});

const LtOp = createToken({
    name: 'LtOp',
    pattern: /</
});

const NeqOp = createToken({
    name: 'NeqOp',
    pattern: /<>/
});

const GteOp = createToken({
    name: 'GteOp',
    pattern: />=/
});

const LteOp = createToken({
    name: 'PercentOp',
    pattern: /<=/
});

// The order of tokens is important
const allTokens = [
    WhiteSpace,
    String,
    SingleQuotedString,
    RefSheetQuoted,
    Function,
    FormulaError,
    RefError,
    Cell,
    RangeColumn,
    RangeRow,
    Sheet,
    Variable,
    Number,
    Boolean,
    Array,

    At,
    Comma,
    Colon,
    Semicolon,
    OpenParen,
    CloseParen,
    OpenSquareParen,
    CloseSquareParen,
    ExclamationMark,
    OpenCurlyParen,
    CloseCurlyParen,
    QuoteS,
    MulOp,
    PlusOp,
    DivOp,
    MinOp,
    ConcateOp,
    ExOp,
    MulOp,
    // IntersectOp,
    PercentOp,
    NeqOp,
    GteOp,
    LteOp,
    GtOp,
    EqOp,
    LtOp,
];

const SelectLexer = new Lexer(allTokens);

allTokens.forEach(tokenType => {
    tokenVocabulary[tokenType.name] = tokenType
});

module.exports = {
    tokenVocabulary: tokenVocabulary,

    lex: function(inputText) {
        const lexingResult = SelectLexer.tokenize(inputText)

        if (lexingResult.errors.length > 0) {
            // console.error(lexingResult.errors)
            throw Error("Sad Sad Panda, lexing errors detected")
        }

        return lexingResult
    }
};