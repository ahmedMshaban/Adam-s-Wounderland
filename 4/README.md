### The Game Project 4 – Side scrolling ###

1. Inspect the code. [0 marks]

2. Add your game character to the sketch. [0 marks]
	- As previously, use the
	`gameChar_x` and `gameChar_y` variables to control the position of
	the character  on the canvas.
	- You only need to use your facing-forward character for this task.
 	- Check your character moves left and right when the corresponding
     keys are pressed.

3. Make an array of tree positions [1 marks]
	- In `setup`, initialise the `trees_x` variable with an array of
	numbers.
	- Each number should represent the x-position at which a
   tree will be drawn on the canvas.

4. Draw the trees [2 marks]
	- In the `draw` function create a for loop to traverse the `trees_x` array.
	HINT: you need to use `trees_x.length` to make sure you loop over every item
	in the array.
	- Copy your tree drawing code from part 2 b into the body of the for loop
	- Now modify your code so that each tree is drawn using the corresponding x position
	from `trees_x`. HINT: If your for loop uses a variable called `i` you can get the x position by using `trees_x[i]`
	- You should end up with lots of trees in different positions.

5. Make an array of clouds [1 marks]
	- In `setup`, initialise the `clouds` variable with an array
	containing some cloud objects (e.g. at least 3). HINT: you can copy these
	from part 2b but vary the x and y positions of each object.

6. Draw the clouds [2 marks]
	- In the `draw` function create a for loop to traverse the `clouds` array.
	- Copy your cloud drawing code from part 2 b into the body of the for loop.
	- Now modify your code so that each cloud is drawn with the position and size determined by
	the corresponding object in the array

7. And now for the mountains [1 mark]
	- Repeat stages 5 and 6 for the mountains

8. And now for the canyons and collectables [1 mark]
	- Repeat two more time for the canyons and collectables

9. Implement scrolling [2 marks]
	- We need to make the background scenery scroll when the character moves towards
	the left and right edges of the canvas. We can achieve this by using p5’s [`translate`](https://p5js.org/reference/#/p5/translate) function in combination
	with [`push`](https://p5js.org/reference/#/p5/push) and [`pop`](https://p5js.org/reference/#/p5/pop)
	- Make sure you've read about how these work before attempting the following steps.
	- Make sure that the sections of code which draw the clouds, mountains, trees etc. are each placed correctly below the comments in the template
	- *Before* the insert the command `push()` followed by the command `translate(scrollPos, 0)`
	- *Before* the code to draw the game character and *after* the code to draw the trees insert the command `pop()`
	- Now when the game character reaches the edge of the screen all these background items will be moved in the opposite direction to the game character, creating the illusion of motion
	- Once you've got your head around what is going on, try adding more items in the 'off screen' space so that the game character has more game world to explore
