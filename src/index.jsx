import { hydrate, prerender as ssr } from 'preact-iso'
import Header from './components/header'
import Footer from './components/footer'
import './style.css';
import MontyHallImage from "./assets/monty-hall-problem.webp"

export function App() {
	return (
		<div className="content">
			<Header/>
			<div>
			<div>
			<h1 data-testid="storyTitle" data-selectable-paragraph="">The Monty Hall Problem isn&rsquo;t about statistics</h1>
			</div>
			<figure>
			<div>
			<div><picture><source srcset={MontyHallImage} type="image/webp" sizes="(min-resolution: 4dppx) and (max-width: 700px) 50vw, (-webkit-min-device-pixel-ratio: 4) and (max-width: 700px) 50vw, (min-resolution: 3dppx) and (max-width: 700px) 67vw, (-webkit-min-device-pixel-ratio: 3) and (max-width: 700px) 65vw, (min-resolution: 2.5dppx) and (max-width: 700px) 80vw, (-webkit-min-device-pixel-ratio: 2.5) and (max-width: 700px) 80vw, (min-resolution: 2dppx) and (max-width: 700px) 100vw, (-webkit-min-device-pixel-ratio: 2) and (max-width: 700px) 100vw, 700px" /><source srcset="https://miro.medium.com/v2/resize:fit:640/1*jR8xIRlKLbQUtLoXJz_-Cg.jpeg 640w, https://miro.medium.com/v2/resize:fit:720/1*jR8xIRlKLbQUtLoXJz_-Cg.jpeg 720w, https://miro.medium.com/v2/resize:fit:750/1*jR8xIRlKLbQUtLoXJz_-Cg.jpeg 750w, https://miro.medium.com/v2/resize:fit:786/1*jR8xIRlKLbQUtLoXJz_-Cg.jpeg 786w, https://miro.medium.com/v2/resize:fit:828/1*jR8xIRlKLbQUtLoXJz_-Cg.jpeg 828w, https://miro.medium.com/v2/resize:fit:1100/1*jR8xIRlKLbQUtLoXJz_-Cg.jpeg 1100w, https://miro.medium.com/v2/resize:fit:1400/1*jR8xIRlKLbQUtLoXJz_-Cg.jpeg 1400w" sizes="(min-resolution: 4dppx) and (max-width: 700px) 50vw, (-webkit-min-device-pixel-ratio: 4) and (max-width: 700px) 50vw, (min-resolution: 3dppx) and (max-width: 700px) 67vw, (-webkit-min-device-pixel-ratio: 3) and (max-width: 700px) 65vw, (min-resolution: 2.5dppx) and (max-width: 700px) 80vw, (-webkit-min-device-pixel-ratio: 2.5) and (max-width: 700px) 80vw, (min-resolution: 2dppx) and (max-width: 700px) 100vw, (-webkit-min-device-pixel-ratio: 2) and (max-width: 700px) 100vw, 700px" data-testid="og" /><img src="https://miro.medium.com/v2/resize:fit:770/1*jR8xIRlKLbQUtLoXJz_-Cg.jpeg" alt="" width="700" height="700" /></picture></div>
			</div>
			</figure>
			<p data-selectable-paragraph="">Named after the affable host of the TV game show &ldquo;Let&rsquo;s Make a Deal,&rdquo; Monty Hall brought this captivating scenario to the public&rsquo;s attention. Here&rsquo;s a lively overview of the Monty Hall problem:</p>
			<p data-selectable-paragraph="">Imagine facing three closed doors. Behind one lurks a grand prize (like a shiny new car), while the others hide less glamorous goats.</p>
			<p data-selectable-paragraph="">You pick a door, say Door A, without a clue of its contents.</p>
			<p data-selectable-paragraph="">Now, Monty Hall, ever the showman, opens one of the remaining doors, revealing a goat. Crucially, he knows which door hides the prize and gleefully exposes a goat.</p>
			<p data-selectable-paragraph="">Here&rsquo;s the twist: You can stick with your initial choice (Door A) or switch to the other closed door (let&rsquo;s call it Door C).</p>
			<p data-selectable-paragraph="">The Monty Hall problem poses this question: Should you stay loyal to your original pick or take a chance on the other door to boost your chances of winning the prize?</p>
			<p data-selectable-paragraph="">Initially, I assumed that if I switched doors, I&rsquo;d have a 50% shot at getting it right. It made sense at first: with two options, a 50% chance seemed fair. But the more I pondered, the less convinced I became. Why wouldn&rsquo;t my odds still be 50% if I stuck with my first choice? If I randomly picked between the last two doors, certainly I&rsquo;d have a 50&ndash;50 toss-up. But why would switching help my odds?</p>
			<p data-selectable-paragraph="">So, I decided to crunch the numbers using JavaScript.</p>
			<pre>const correct = []<br /><br />const createArr = () =&gt; {"{"}<br /> const number = Math.floor(Math.random() * 3)<br /> let arr = [false, false, false]<br /> arr[number] = true<br /><br /> return arr<br />{"}"}<br /><br />const getUnselectedIndex = (arr, selectionArr) =&gt; {"{"}<br /> if (arr[0] == false &amp;&amp; selectionArr[0] == false)<br /> return 0<br /> if (arr[1] == false &amp;&amp; selectionArr[1] == false)<br /> return 1<br /> if (arr[2] == false &amp;&amp; selectionArr[2] == false)<br /> return 2<br />{"}"}<br /><br />const removeWrongOption = (arr, selectionArr, unselectedIndex) =&gt; {"{"}<br /> arr.splice(unselectedIndex, 1)<br /> selectionArr.splice(unselectedIndex, 1)<br />{"}"}<br /><br />const run = () =&gt; {"{"}<br /> const arr = createArr()<br /> let selectionArr = createArr()<br /> let unselectedIndex = getUnselectedIndex(arr, selectionArr)<br /> removeWrongOption(arr, selectionArr, unselectedIndex)<br /> selectionArr[0] = !selectionArr[0]<br /> selectionArr[1] = !selectionArr[1]<br /><br /> if (arr[0]) {"{"}<br /> correct.push(selectionArr[0])<br /> {"}"} else {"{"}<br /> correct.push(selectionArr[1])<br /> {"}"}<br />{"}"}<br /><br />for (let i = 0; i &lt; 1000000; i++) {"{"}<br /> run()<br />{"}"}<br /><br />const trueCount = correct.reduce((count, currentValue) =&gt; count + (currentValue === true ? 1 : 0), 0);<br />const percentage = (trueCount / correct.length) * 100;<br />console.log(percentage)</pre>
			<p data-selectable-paragraph="">In short, the script will do the following:</p>
			<ol>
			<li data-selectable-paragraph="">Creates a hypothetical set of doors with a random prize allocation.</li>
			<li data-selectable-paragraph="">Randomly selects a door for the contestant&rsquo;s initial pick.</li>
			<li data-selectable-paragraph="">Removes the door that wasn&rsquo;t chosen and doesn&rsquo;t hold the prize.</li>
			<li data-selectable-paragraph="">Switches the contestant&rsquo;s selection to the remaining door.</li>
			<li data-selectable-paragraph="">Logs whether the guess was right or wrong.</li>
			<li data-selectable-paragraph="">Repeat steps 1&ndash;5 a cool million times.</li>
			<li data-selectable-paragraph="">Calculates the percentage of correct guesses.</li>
			</ol>
			<p data-selectable-paragraph="">And here&rsquo;s the kicker: the results showed that switching doors was the savvy move! Astonishingly, I got it right two-thirds of the time when I switched doors! Conversely, sticking with my initial choice only yielded success one-third of the time. What gives?</p>
			<p data-selectable-paragraph="">To unravel this paradox, I turned to probability theory and conditional probabilities. The crux lies in understanding that when you make your initial selection, there&rsquo;s a 2/3 chance the prize lies behind one of the other doors. So when Monty reveals a goat, the likelihood that the unchosen door harbors the prize doubles to 2/3, while your chosen door&rsquo;s chances stay put at 1/3.</p>
			<p data-selectable-paragraph="">Still puzzled? Allow me to demystify further using an Excel spreadsheet.</p>
			<p data-selectable-paragraph="">In essence, you&rsquo;re faced with nine possible scenarios for where the prize lies and where you guess.</p>
			<ol>
			<li data-selectable-paragraph="">The prize and your guess can be behind door 1</li>
			<li data-selectable-paragraph="">The prize can be behind Door 1 and you can guess Door 2</li>
			<li data-selectable-paragraph="">The prize can be behind Door 1 and you can guess Door 3</li>
			<li data-selectable-paragraph="">The prize can be behind Door 2 and you can guess Door 1</li>
			<li data-selectable-paragraph="">The prize and your guess can be behind door 2</li>
			<li data-selectable-paragraph="">The prize can be behind Door 2 and you can guess Door 3</li>
			<li data-selectable-paragraph="">The prize can be behind Door 3 and you can guess Door 1</li>
			<li data-selectable-paragraph="">The prize can be behind Door 3 and you can guess Door 2</li>
			<li data-selectable-paragraph="">The prize and your guess can be behind door 3</li>
			</ol>
			<p data-selectable-paragraph="">In the image below I&rsquo;ve marked each cell with the word Guess where the contestant would have guessed. And I marked each cell green where the prize is.</p>
			<figure>
			<div><picture><source srcset="https://miro.medium.com/v2/resize:fit:640/format:webp/1*N3Lvkkr5_BS6kxHNG1UcRg.png 640w, https://miro.medium.com/v2/resize:fit:720/format:webp/1*N3Lvkkr5_BS6kxHNG1UcRg.png 720w, https://miro.medium.com/v2/resize:fit:750/format:webp/1*N3Lvkkr5_BS6kxHNG1UcRg.png 750w, https://miro.medium.com/v2/resize:fit:786/format:webp/1*N3Lvkkr5_BS6kxHNG1UcRg.png 786w, https://miro.medium.com/v2/resize:fit:828/format:webp/1*N3Lvkkr5_BS6kxHNG1UcRg.png 828w, https://miro.medium.com/v2/resize:fit:1100/format:webp/1*N3Lvkkr5_BS6kxHNG1UcRg.png 1100w, https://miro.medium.com/v2/resize:fit:930/format:webp/1*N3Lvkkr5_BS6kxHNG1UcRg.png 930w" type="image/webp" sizes="(min-resolution: 4dppx) and (max-width: 700px) 50vw, (-webkit-min-device-pixel-ratio: 4) and (max-width: 700px) 50vw, (min-resolution: 3dppx) and (max-width: 700px) 67vw, (-webkit-min-device-pixel-ratio: 3) and (max-width: 700px) 65vw, (min-resolution: 2.5dppx) and (max-width: 700px) 80vw, (-webkit-min-device-pixel-ratio: 2.5) and (max-width: 700px) 80vw, (min-resolution: 2dppx) and (max-width: 700px) 100vw, (-webkit-min-device-pixel-ratio: 2) and (max-width: 700px) 100vw, 465px" /><source srcset="https://miro.medium.com/v2/resize:fit:640/1*N3Lvkkr5_BS6kxHNG1UcRg.png 640w, https://miro.medium.com/v2/resize:fit:720/1*N3Lvkkr5_BS6kxHNG1UcRg.png 720w, https://miro.medium.com/v2/resize:fit:750/1*N3Lvkkr5_BS6kxHNG1UcRg.png 750w, https://miro.medium.com/v2/resize:fit:786/1*N3Lvkkr5_BS6kxHNG1UcRg.png 786w, https://miro.medium.com/v2/resize:fit:828/1*N3Lvkkr5_BS6kxHNG1UcRg.png 828w, https://miro.medium.com/v2/resize:fit:1100/1*N3Lvkkr5_BS6kxHNG1UcRg.png 1100w, https://miro.medium.com/v2/resize:fit:930/1*N3Lvkkr5_BS6kxHNG1UcRg.png 930w" sizes="(min-resolution: 4dppx) and (max-width: 700px) 50vw, (-webkit-min-device-pixel-ratio: 4) and (max-width: 700px) 50vw, (min-resolution: 3dppx) and (max-width: 700px) 67vw, (-webkit-min-device-pixel-ratio: 3) and (max-width: 700px) 65vw, (min-resolution: 2.5dppx) and (max-width: 700px) 80vw, (-webkit-min-device-pixel-ratio: 2.5) and (max-width: 700px) 80vw, (min-resolution: 2dppx) and (max-width: 700px) 100vw, (-webkit-min-device-pixel-ratio: 2) and (max-width: 700px) 100vw, 465px" data-testid="og" /><img src="https://miro.medium.com/v2/resize:fit:512/1*N3Lvkkr5_BS6kxHNG1UcRg.png" alt="" width="465" height="325" /></picture></div>
			<figcaption data-selectable-paragraph="">Green indicates where the prize is. Guess 1 is where you guessed</figcaption>
			</figure>
			<p data-selectable-paragraph="">When Monty eliminates one of the doors and you stick with your original choice, nothing changes. You&rsquo;re still staring at a 33% chance of hitting the jackpot.</p>
			<h2 data-selectable-paragraph="">But when Monty gives you the option to switch, everything shifts.</h2>
			<figure>
			<div><picture><source srcset="https://miro.medium.com/v2/resize:fit:640/format:webp/1*BbmVKKEaGrV0w2_bUKIpYw.png 640w, https://miro.medium.com/v2/resize:fit:720/format:webp/1*BbmVKKEaGrV0w2_bUKIpYw.png 720w, https://miro.medium.com/v2/resize:fit:750/format:webp/1*BbmVKKEaGrV0w2_bUKIpYw.png 750w, https://miro.medium.com/v2/resize:fit:786/format:webp/1*BbmVKKEaGrV0w2_bUKIpYw.png 786w, https://miro.medium.com/v2/resize:fit:828/format:webp/1*BbmVKKEaGrV0w2_bUKIpYw.png 828w, https://miro.medium.com/v2/resize:fit:1100/format:webp/1*BbmVKKEaGrV0w2_bUKIpYw.png 1100w, https://miro.medium.com/v2/resize:fit:930/format:webp/1*BbmVKKEaGrV0w2_bUKIpYw.png 930w" type="image/webp" sizes="(min-resolution: 4dppx) and (max-width: 700px) 50vw, (-webkit-min-device-pixel-ratio: 4) and (max-width: 700px) 50vw, (min-resolution: 3dppx) and (max-width: 700px) 67vw, (-webkit-min-device-pixel-ratio: 3) and (max-width: 700px) 65vw, (min-resolution: 2.5dppx) and (max-width: 700px) 80vw, (-webkit-min-device-pixel-ratio: 2.5) and (max-width: 700px) 80vw, (min-resolution: 2dppx) and (max-width: 700px) 100vw, (-webkit-min-device-pixel-ratio: 2) and (max-width: 700px) 100vw, 465px" /><source srcset="https://miro.medium.com/v2/resize:fit:640/1*BbmVKKEaGrV0w2_bUKIpYw.png 640w, https://miro.medium.com/v2/resize:fit:720/1*BbmVKKEaGrV0w2_bUKIpYw.png 720w, https://miro.medium.com/v2/resize:fit:750/1*BbmVKKEaGrV0w2_bUKIpYw.png 750w, https://miro.medium.com/v2/resize:fit:786/1*BbmVKKEaGrV0w2_bUKIpYw.png 786w, https://miro.medium.com/v2/resize:fit:828/1*BbmVKKEaGrV0w2_bUKIpYw.png 828w, https://miro.medium.com/v2/resize:fit:1100/1*BbmVKKEaGrV0w2_bUKIpYw.png 1100w, https://miro.medium.com/v2/resize:fit:930/1*BbmVKKEaGrV0w2_bUKIpYw.png 930w" sizes="(min-resolution: 4dppx) and (max-width: 700px) 50vw, (-webkit-min-device-pixel-ratio: 4) and (max-width: 700px) 50vw, (min-resolution: 3dppx) and (max-width: 700px) 67vw, (-webkit-min-device-pixel-ratio: 3) and (max-width: 700px) 65vw, (min-resolution: 2.5dppx) and (max-width: 700px) 80vw, (-webkit-min-device-pixel-ratio: 2.5) and (max-width: 700px) 80vw, (min-resolution: 2dppx) and (max-width: 700px) 100vw, (-webkit-min-device-pixel-ratio: 2) and (max-width: 700px) 100vw, 465px" data-testid="og" /><img src="https://miro.medium.com/v2/resize:fit:512/1*BbmVKKEaGrV0w2_bUKIpYw.png" alt="" width="465" height="325" /></picture></div>
			<figcaption data-selectable-paragraph="">Green is where the prize is. Red is the eliminated door. Guess 2 is where you move your guess to.</figcaption>
			</figure>
			<p data-selectable-paragraph="">In the revised scenario, switching doors boosts your odds to 66% &mdash; a whopping 33% increase! How? By swapping the likelihood of choosing correctly. With one wrong option out of the equation, you&rsquo;re essentially swapping your pick to the other two slots &mdash; doubling your chances of winning the prize.</p>
			<blockquote>
			<p data-selectable-paragraph="">So after spending an afternoon attempting to prove something wrong, it turns out I was way off.</p>
			</blockquote>
			<p data-selectable-paragraph="">So, the next time you&rsquo;re pondering whether to stay or switch, remember the Monty Hall problem: a lesson in probability that&rsquo;s as surprising as it is enlightening.</p>
			<div className="footer-spacer"></div>
			</div>
			<Footer/>
		</div>
	);
}

if (typeof window !== 'undefined') {
	hydrate(<App />, document.getElementById('app'));
}

export async function prerender(data) {
	return await ssr(<App {...data} />);
}
