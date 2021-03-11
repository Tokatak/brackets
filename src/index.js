module.exports = function check( str, bracketsConfig ) {

    function findBracketClass( char ) {
        for ( let i = 0; i < bracketsConfig.length; i++ ) {
            if ( char === bracketsConfig[ i ][ 0 ] || char === bracketsConfig[ i ][ 1 ] )
                return i;
        }
        throw new Exception();
    }

    function findBracketType( char, bracketClass ) {
        if ( char === bracketsConfig[ bracketClass ][ 0 ] )
            return 0;

        if ( char === bracketsConfig[ bracketClass ][ 1 ] ) {
            return 1;
        }
        throw new Exception();
    }

    function checkIfSameBrackets( clas ) {
        return bracketsConfig[ clas ][ 0 ] === bracketsConfig[ clas ][ 1 ];
    }


    let initialNode = {};
    let current = initialNode;
    let c;
    for ( let i = 0; i < str.length; i++ ) {

        let clas = findBracketClass( str[ i ] );
        let type = findBracketType( str[ i ], clas );
        let sameBrackets = checkIfSameBrackets( clas );

        if ( sameBrackets ) {
            if ( current.clas === clas )
                type = 1;
        }

        // Open
        if ( type === 0 ) {
            let openNode = {};
            openNode.clas = clas;

            current.child = openNode;
            openNode.parent = current;

            current = openNode;
        }

        //closing
        if ( type == 1 ) {

            // wrong closing item
            if ( current.clas != clas )
                return false;

            // right clas
            current = current.parent;
        }
    }

    return current == initialNode;
}
