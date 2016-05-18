# Complex navigation scenarios with React Native experimental navigation

## New Navigation paradigm in RN

React Native is switching to a different navigation paradigm [LINK!] taking care of application navigation in a more Reduxy way. Navigation components now talk to reducers instead of storing navigation state internall attached to them. Check out examples in the RN repository to get a feel for what it's like to use these new components. [LINK!]   

## Outline what we are trying to achieve

After playing with basic examples and figuring out how to hook new navigation components to a Redux store (easy!), I wanted to move on and try it with a scenario that seems to be closer to what a real app would need navigation wise.

Here's a rough sketch of what we will be trying to accomplish with his app

![Better js](.github/app-setup.gif)

Notice how we have a few different navigatinal tiers - there's a top-level card stack navigation that manages Tab views and a 'New Item' screen (top level gray screen with React logo). 

Tab navigation lives on it's own within one of the top level cards. We have 3 tabs in the app: Items, Notifications, Settings.   

The next navigational tier is within the feed tab that shows a list of items in your application. Clicking on one of the items takes you to details view screen which is still embedded with the feed tab. An example of this on twitter is you clicking on a tweet to get more details on what's going on with a tweet 

## First try

My initial attempt to implement this was to come up with 1 centralized navigation reducer plugged into the app on a top level managing this whole situation. I did manage to get to work with the scenario described above but looking back at it for a second, i realized i needed to do smth else. Just to give you an idea of how bad it was, here's a snapshot of the code for this nav reducer

<show code for the original nav reducer>

Not only it is super hard to reason about the behavior of this reducer, supporting and extending this looks like a nightmare. What i really wanted is to have separate reducers for all the different nav tiers and plug them in when needed within different parts of the application. So we had to start from scratch

<Jony Ive>  

## Scoped sub navigators

What if we could tackle navigation in isolation starting from the top level, adding sub navigation within our component tree when needed. After all, since navigation control is expressed using reducers, nothing stops us from connecting certain components to these reducers as we go.

### Step 1: Top level cards

The first step would be to get top level card navigation to work

<show original navigation diagram>

Let's define a reducer for this using TabReducers 

<show reducers file>

We can now connect it to a top-level component in our app

<show top level component rendering card stack>

So far so good. Let's move on to handling moving from the main card with tabs to a 'New Item' card.

<show how to wire add new item card>

### Step 2: Tabs

Let's now enable people switching between different tabs in the app

<show tab reducer>

Here's how we attach this to our tab component

<show tab component with tab reducer attached to it>

### Quick recap

Notice how we now have 2 nav hierarchies in the app coexisting in peace. Corresponding nav reducers are compact and easy to reason about.

### Step 3: List -> Details nav

Remember how we are supposed to be able to navigate from list for details view in the feed tab? Let's implement this

<schema of list view -> details navigation>

Traditionally, let's start with defining a nav reducer for the feed component. Once again, it is going to be a stack reducer

<show reducer for list-details view>

Once again attaching this to the feed component using CardStack component

<show how reducer is attached to the component>    

### Problem

An attentive reader might be able to point out the problem we are about to run into at this point. Since our nav sub-reducers coexist within the app store, each of them will be trying to respond to an incoming event. With 2 stack reducers in the system (global navigation and list-details reducer), we are going to end up with 'push', 'back' and 'BackAction' actions clashing. What do we do?

We could come up with special names for every new nav action but we will be loosing ability to reuse pre made reducers. A solution I would like to suggest it so use nav keys to scope both actions and reducers as follows

<show scoped onNavigate>

and a corresponding reducer now is

<show scoped reducer>

### Move to scoped navigation

We are going to go back and convert our existing navigation to use the notion scope.

## Conclusion

New RN navigation approach is great for simplifying the way we reason about navigation and gets it closer to a Redux architecture which many of us are already using in our React/RN apps. Setting up monolithic reducer for the app that combines multiple navigational modes has proven to be tedious and hard to maintain.

The proposed solution is to split navigation reduction into a series of scoped nav reducers where each individual reducer is respoinsible for a part of app navigation system while coordinating with other reducers using navigational key as a scope identifier.

This example is intentionally very verbose (e.g. scoping can be moved to a utility library and applied to both reducers and connector). The intetion was to makes this scoping very explicit to the reader

<show example>

Looking forward to your feedback and experience working with navigation in RN. 
   