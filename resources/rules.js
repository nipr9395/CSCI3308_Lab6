/*
[IMPORTANT] You are free to create any number of helper function.
We know the problem could be seached online, and we are aware of those solutions.
So please cite sources if you took help from any online resource.
*/

// ----------------------- Important global variables (nothing to do here) ---------------------------- //

// Ids for all of the table elements. You can grab any cell element by using document.getElementById("A1");
var table_ids = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]

/*
An integer array of length 9.
Usaged: This is to store the state to the tictactoe board. E.g., if player 1 (who is X) clicks on cell 'A1', the board_state[0] will be set to 1.
If player 2 (who is O) clicks on cell 'A3', the board_state[2] will be set to 0; Any move made by player 1 is stored as a '1' and any move made by player 2 is stored as a '0'.
So, after the above two moves, board_state will look as follows [1, -1, 0, -1, -1, -1, -1, -1, -1]
*/
var board_state = [-1,-1,-1,-1,-1,-1,-1,-1,-1]

// A boolean to keep track of the status of the game; false means the game has not started. The default value is set to false.
var started = false

/*
A variable to keep track of each players' turn. Since the game always starts with player 1, the default value is set to '1'.
1 means player_1
0 means player_0
*/
var turn = 1

// ---------------------- Helper Functions (TODO: Implement each helper function as specified) --------------------- //

/*
 @Return boolean
 @Param _str - A string variable
 This method returns true if the '_str' is null or it has a length of 0, otherwise, it returns false
*/
function isEmpty(_str) {
	return (!_str || 0 === _str.length)
}

/*
@Return int
@Param - No param
This method returns the 'turn' variable:
turn = 1 is for player_1 and
turn = 0 is for player_2
*/
function whose_move(){
	return this.turn
}

/*
@Return void
@Param  - No param
This methods toggles the 'turn' variable:
if the turn is set to 1 it will make it 0
if the turn is set to 0 it will make it 1
*/
function toggle_move() {
	this.turn = !this.turn
}

/*
@Return boolean
@Param - No param
This method returns the value of the 'started' boolean variable:
true means the game has started
false means the game has not started
*/
function game_started(){
	return this.started
}

function game_won(){
	//Display Winner
	whose_move() ? document.getElementById("turn_info").innerHTML = "Player 1 Wins!!" : document.getElementById("turn_info").innerHTML = "Player 2 Wins!!";
	document.getElementById("turn_info").innerHTML += " Resetting Game...";
	//Disable Play Button
	document.getElementById("play_id").disabled = true;
	//Wait for 2.5 seconds to reset.
	setTimeout(reset_play,2500);
}

function check_win(a,b,c){
	return (board_state[a] != -1 && board_state[a] == board_state[b] && board_state[b] == board_state[c]);
}

// ---------------------- Game Rules (TODO: Implement each game function as specified) --------------------- //


/*
Rule 1
This method is called when the 'Begin Play' button is clicked.
The method should do the following:
1. Verify if the player names are empty or not. Raise an alert if they are empty. If the fields are empty do not start the game. This just means the function will return and do nothing. The 'started' flag will not be modified.
2. If all verification is successful, disable the name fields and update the player moves. Set the 'started' flag to true.
3. If the game has started, disable the 'Begin Play' button and enable the 'Play' button. Hint: document.getElementById("id").disabled = true;
*/
function begin_play(){
 if(isEmpty(document.getElementById("player1_id").value) || isEmpty(document.getElementById("player2_id").value)){
	 document.getElementById("turn_info").innerHTML = "One or more player names are blank! Game has not begun.";
	 return;
 }
 this.started=true;
 whose_move() ? document.getElementById("turn_info").innerHTML = "Player 1's Turn!" : document.getElementById("turn_info").innerHTML = "Player 2's Turn!"
 document.getElementById("player1_id").disabled=true;
 document.getElementById("player2_id").disabled=true;
 document.getElementById("begin_play_id").disabled=true;
 document.getElementById("play_id").disabled=false;

}

/*
Rule 2
This method is called when the 'Reset Play' button is clicked.
The method should do the following:
1. The 'Reset Play' button should reset the whole game. Clear the three text boxes, set the 'turn' variable to the default message, and set the 'started' flag to false.
2. Enable the name fields and the 'Begin Play' button.
3. Set the Tic Tac Toe grid to its default entries and disable the 'Play' button.
4. Clicking 'Reset Play' again and again has the same effect (or no effect when clicked multiple times).
*/
function reset_play(){
//Set Game Variables
this.started = false;
this.turn = 1;
//Clear and Enable Name Fields
document.getElementById("player1_id").value = null;
document.getElementById("player2_id").value = null;
document.getElementById("player1_id").disabled=false;
document.getElementById("player2_id").disabled=false;
//Clear Move Field
document.getElementById("move_text_id").value = null;
//Enable Begin Play Button
document.getElementById("begin_play_id").disabled = false;
//Disable Play Button
document.getElementById("play_id").disabled = true;
//Update Turn Info Text
document.getElementById("turn_info").innerHTML = "Game has not begun.";
//Reset Board to Defaults
document.getElementById("A1").innerHTML = "A1";
document.getElementById("A2").innerHTML = "A2";
document.getElementById("A3").innerHTML = "A3";
document.getElementById("B1").innerHTML = "B1";
document.getElementById("B2").innerHTML = "B2";
document.getElementById("B3").innerHTML = "B3";
document.getElementById("C1").innerHTML = "C1";
document.getElementById("C2").innerHTML = "C2";
document.getElementById("C3").innerHTML = "C3";

board_state=[-1,-1,-1,-1,-1,-1,-1,-1,-1];
// document.getElementById.

}

/*
Rule 3
This method is called every time a player makes a move (i.e., the 'Play' button is clicked).
The method should do the following:
1. The moves should be validated. There can only be ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]. If there is any other entry, raise an alert.
2. If the move is a valid move, the grid should be updated with the correct move. Player 1 is always 'X', and Player 2 is always 'O' (i.e., the capital letter 'O'). Update the 'turn' variable. Hint: use toggle_move()
3. If the move is on a cell that is already filled, raise an alert.
5. After any move, the state of the grid is validated. If there is a winner raise an alert (e.g., "Player 1 wins!!" or "X wins!")
6. When a player wins the game, the game is reset automatically.
7. If there are no more possible moves (and there is no winner), do nothing. The user must click the 'Reset Play' button.
*/
function play() {
	//Reset showing whose turn it is
	whose_move() ? document.getElementById("turn_info").innerHTML = "Player 1's Turn!" : document.getElementById("turn_info").innerHTML = "Player 2's Turn!"
	//Get Player's Move
	var player_move = document.getElementById("move_text_id").value;
	//Check for invalid moves
	if(!table_ids.includes(player_move)){
		document.getElementById("turn_info").innerHTML +=" This is not a valid move. Try again";
		return;
	}
	//Check for moves already made
	if(document.getElementById(player_move).innerHTML != player_move){
		document.getElementById("turn_info").innerHTML +=" This move has already been made. Try again";
		return;
	}
	//Mark the player's move with an X or O
	whose_move() ? document.getElementById(player_move).innerHTML = "X" : document.getElementById(player_move).innerHTML = "O";
	//Set Move in Board State array
	whose_move() ? board_state[table_ids.indexOf(player_move)] = 1 : board_state[table_ids.indexOf(player_move)] = 0
	//Clear Move Text Field
	document.getElementById("move_text_id").value = null;
	//Check for win
	if(check_win(0,1,2)) game_won();
	else if(check_win(3,4,5)) game_won();
	else if(check_win(6,7,8)) game_won();
	else if(check_win(0,4,8)) game_won();
	else if(check_win(2,4,6)) game_won();
	else if(check_win(0,3,6)) game_won();
	else if(check_win(1,4,7)) game_won();
	else if(check_win(2,5,8)) game_won();
	else{
	//Toggle whose turn it is
	toggle_move();
	//Update Player Move Text
	whose_move() ? document.getElementById("turn_info").innerHTML = "Player 1's Turn!" : document.getElementById("turn_info").innerHTML = "Player 2's Turn!"
	document.getElementById("player1_id").disabled=true;
	}
}

// ---------------------------------------------------------------------------------------------------------- //

/*
DO NOT MODIFY THIS METHOD
*/
function moveEnter(event) {
	if(event.keyCode == 13) {
		event.preventDefault()
		play()
	}

}
