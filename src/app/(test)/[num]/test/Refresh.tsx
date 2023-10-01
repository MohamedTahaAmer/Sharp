'use client';
import Link from 'next/link';
import { doNothing, revalidate } from './action';

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const Refresh = () => {
	return (
		<>
			<div className='m-10'>Refresh</div>
			<div className='m-10'>
				{arr.map((el) => (
					<Link
						// - calling a server action won't couse a page refresh, unless we are calling revalidatePath('/bla/bla/bla/bla')
						// - this means just calling revalidatePath() on any path or with no path, will couse this route to re-render
						// > note that this server action call is like calling an api endpoint, along with making a fetch request to the current route before going to the server action,
						// > but although we are making request to the current route,next js won't re-render this route and if we didn't revalidate the path in the serveraction (see below what revalidating a path do), then this route won't get re-rendered like calling the doNothing() below
						// > and that despite using both
						/*export const dynamic = 'force-dynamic';
						export const fetchCache = 'force-no-store';*/
						//
						onClick={() => revalidate(`/${el}/test`)}
						// - this doNothing doesn't call the revalidatePath() there in the server action, so it will just call the server action and that won't couse any route to rerender
						// - it also will make a request to the current route (i think calling a server action from any route, makes a fetch call to that route), but hence we aren't revalidating any pathes in this doNothing(), this route won't be rerenderd
						// - i guss calling revalidatePath() on any path couses the current route that the user in to re-run
						// onClick={() => doNothing()}
						key={el}
						href={`/${el}/test`}
						className='border p-4'
					>
						go to {el}
					</Link>
				))}
			</div>

			<button
				className='border p-4'
				onClick={() => doNothing()}
				// onClick={() => revalidate(`/4/test`)}
			>
				refresh 4
			</button>
		</>
	);
};

export default Refresh;

/* 
// ? at the end, calling revalidatePath() is like calling reouter.refresh(), but it works only on the server, and it
	// 1- purges the cache for the hole route tree
	// 2- reruns the current route to return a fresh data to the client, and when you client nacigate to any other route in the tree, you git anew data for that route
// ?  router.refresh() will do the same but it only for the current route

------------------------------------------------------------------------------
------------------------------------------------------------------------------

// > so When to use which

// < router.refresh() 
	// - works only on the client
	// - and revalidates only the current route
	// - if you called it on Link click, then it will 
		// 1- revalidate the current route, 
			// the refresh is doing it's job on the current route
		// 2- then make a fetch request to the href, 
			// the Link is doing it's job 
		// 3- then revalidates that href route
			// the refresh is doing it's job on the new route

// < revalidatePath()
	// - can only be called on the server
		// so you may think that you can call it on the the page, then it will revalidate this page on each request
		// but when navigating using the client-navigation without calling a server action that will revalidate this path, or without calling router.refresh() 
			// the request won't evetn reach this page, so revalidatePath() won't event get called
			
	// - so the correct way for using this revalidatePath() is on server actions
		// but server actoins can only be called 
			// 1- on a server component's form, 
			// 2- from an event handler on the client 
			// 3- or from inside a useEffect on the client, as you can't call a SA, or your own api while the client componet is being rendered, you must wait untill it finishes rendering, then the SA and the API will both be available for the client component to call

	// - if you called it on Link click, then it will 
		// 1- revalidate the current route, 
			// as if it was a router.refresh() for the current route
		// 2- make an fetch request to the server action which will
			// the action is doing it's job, which is calling that server action function
		// 3- then make a fetch request to the href
			// the Link is doing it's job 
		// 4- then revalidates that href route 
			// as if it was a router.refresh() for the new route

	// > that said, to use this revalidatePath() you will have to be on the client
		// and hence you are on the client, just use router.refresh() and avoide making an api call,
		// unless you wanna revalidate the hole route tree then use revalidatePath()
*/

/*
Next Docs - 1
1- all that stuff about the route being static and dynamic
was BS, if the page wasn't a client page, then it was allways static 
when testing, the request was coming to the server page, 
what's out side the page was redering, but the page() wasn't being called
and that's wheather i used the params, the headers, or event the 
dynamic and force no cashe, no thingworked
the way that i was able to call the page without manually revalidating 
it, was by making a call to a server action that does nothing
clicking the button that calles the server action 
calles the page, then goes to the server action

# the way i tested the page being called, was by three ways
1- making a console log out side the page()
2- looking at my middleware console logs
3- from the network tap on the devtools

# how to call the page without hard reloading
as client navigation will call the page only if it's the 
first time then the browser will cache that request 
and will never send it again?
1- by using onclick(router.refresh) on the Link element
 or on a div that wrapps it
2- by using onClick(()=>servverAction()) also on a Link or a div wrapper

# how to revalidate the current route
1- router.refresh() will revalidate the current route 
and the route that the link is going to
2- calling revalidate('/anypath')
will revalidate the current route, the route the Link is point to
* also the hole route tree (didn't test that hole route tree think, as 
i didn't think of a way to actually test it
i'm just happy with the results i got so far)
*/

//
