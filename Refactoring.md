# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

#### Improve Readability and Reusability.
I split the logic into several different functions to enhance readability.
Each function has a single logic so it makes it easier to understand its purpose for each step.
And also by creating smaller functions that perform specific tasks, it's better for code reusability and testability.

#### Improve Naming
When I am defining smaller functions, I used names to be descriptive and reflect their purpose to make the code self-explanatory.
