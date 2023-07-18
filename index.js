// setup requirements and constants
const express = require('express'),
    morgan = require('morgan'),
    fs = require('fs'),
    path = require('path'),
    bodyParser = require('body-parser'),
    uuid = require('uuid');

const app = express();

app.use(bodyParser.json());

let users = [
    {
        id: 1,
        name: 'Zach',
        favoriteMovies: [
            `Star Wars: Episode V - The Empire Strikes Back`,
            `Raiders of the Lost Ark`,
            `The Princess Bride`,
            `The Count of Monte Cristo`,
            `The Dark Knight`,
            `Iron Man`,
            `The Court Jester`,
            `For a Few Dollars More`,
            `The Santa Clause`,
            `Dungeons & Dragons: Honor Among Thieves`,
            `Secondhand Lions`,
            `Lilo & Stitch`,
            `Galaxy Quest`,
            `Forrest Gump`,
            `Catch Me If You Can`
        ]
    },
    {
        id: 2,
        name: 'Ginger',
        favoriteMovies: [
            `Raiders of the Lost Ark`,
            `The Princess Bride`,
            `The Count of Monte Cristo`,
            `Secondhand Lions`,
            `The Dark Knight`,
            `Dungeons & Dragons: Honor Among Thieves`,
            `Catch Me If You Can`
        ]
    },
    {
        id: 3,
        name: 'Micah',
        favoriteMovies: []
    }
];

let movies = [
    {
        'Title': `Star Wars: Episode V - The Empire Strikes Back`,
        'Year': '1980',
        'Image': 'https://www.imdb.com/title/tt0080684/mediaviewer/rm3114097664/?ref_=ext_shr_lnk',
        'Description': `After the Rebels are overpowered by the Empire, Luke Skywalker begins his Jedi training with Yoda, while his friends are pursued across the galaxy by Darth Vader and bounty hunter Boba Fett.`,
        'Directors':
            [
                {
                    'Name': 'Irvin Kershner',
                    'Birth': '1923',
                    'Death': '2010',
                    'Bio': `Irvin Kershner was born on April 29, 1923 in Philadelphia, Pennsylvania. A graduate of the University of Southern California film school, Kershner began his career in 1950, producing documentaries for the United States Information Service in the Middle East. He later turned to television, directing and photographing a series of documentaries called "Confidential File". Kershner was one of the directors given his first break by producer Roger Corman, for whom he shot Stakeout on Dope Street (1958). The main theme that runs through many of his films is social alienation and human weaknesses - although his biggest commercial success was the science fiction blockbuster Star Wars: Episode V - The Empire Strikes Back (1980). Irvin Kershner died at age 87 of lung cancer in his home in Los Angeles, California on November 27, 2010.`
                }
            ],
        'Genres':
            [
                {
                    'Name': 'Action',
                    'Description': `Associated with particular types of spectacle (e.g., explosions, chases, combat).`
                },
                {
                    'Name': 'Adventure',
                    'Description': `Implies a narrative that is defined by a journey (often including some form of pursuit) and is usually located within a fantasy or exoticized setting. Typically, though not always, such stories include the quest narrative. The predominant emphasis on violence and fighting in action films is the typical difference between the two genres.`
                },
                {
                    'Name': 'Fantasy',
                    'Description': `Films defined by situations that transcend natural laws and/or by settings inside a fictional universe, with narratives that are often inspired by or involve human myths.`
                }
            ]
    },
    {
        'Title': `Raiders of the Lost Ark`,
        'Year': '1981',
        'Image': 'https://www.imdb.com/title/tt0082971/mediaviewer/rm2091520257/?ref_=ext_shr_lnk',
        'Description': `In 1936, archaeologist and adventurer Indiana Jones is hired by the U.S. government to find the Ark of the Covenant before the Nazis can obtain its awesome powers.`,
        'Directors':
            [
                {
                    'Name': 'Steven Spielberg',
                    'Birth': '1946',
                    'Death': '',
                    'Bio': `One of the most influential personalities in the history of cinema, Steven Spielberg is Hollywood's best known director and one of the wealthiest filmmakers in the world. He has an extraordinary number of commercially successful and critically acclaimed credits to his name, either as a director, producer or writer since launching the summer blockbuster with Jaws (1975), and he has done more to define popular film-making since the mid-1970s than anyone else.

                    Steven Allan Spielberg was born in 1946 in Cincinnati, Ohio, to Leah Frances (Posner), a concert pianist and restaurateur, and Arnold Spielberg, an electrical engineer who worked in computer development. His parents were both born to Russian Jewish immigrant families. Steven spent his younger years in Haddon Township, New Jersey, Phoenix, Arizona, and later Saratoga, California. He went to California State University Long Beach, but dropped out to pursue his entertainment career. He gained notoriety as an uncredited assistant editor on the classic western Wagon Train (1957). Among his early directing efforts were Battle Squad (1961), which combined World War II footage with footage of an airplane on the ground that he makes you believe is moving. He also directed Escape to Nowhere (1961), which featured children as World War Two soldiers, including his sister Anne Spielberg, and The Last Gun (1959), a western. All of these were short films. The next couple of years, Spielberg directed a couple of movies that would portend his future career in movies. In 1964, he directed Firelight (1964), a movie about aliens invading a small town. In 1967, he directed Slipstream (1967), which was unfinished. However, in 1968, he directed Amblin' (1968), which featured the desert prominently, and not the first of his movies in which the desert would feature so prominently. Amblin' also became the name of his production company, which turned out such classics as E.T. the Extra-Terrestrial (1982). Spielberg had a unique and classic early directing project, Duel (1971), with Dennis Weaver. In the early 1970s, Spielberg was working on TV, directing among others such series as Rod Serling's Night Gallery (1969), Marcus Welby, M.D. (1969) and Murder by the Book (1971). All of his work in television and short films, as well as his directing projects, were just a hint of the wellspring of talent that would dazzle audiences all over the world.
                    
                    Spielberg's first major directorial effort was The Sugarland Express (1974), with Goldie Hawn, a film that marked him as a rising star. It was his next effort, however, that made him an international superstar among directors: Jaws (1975). This classic shark attack tale started the tradition of the summer blockbuster or, at least, he was credited with starting the tradition. His next film was the classic Close Encounters of the Third Kind (1977), a unique and original UFO story that remains a classic. In 1978, Spielberg produced his first film, the forgettable I Wanna Hold Your Hand (1978), and followed that effort with Used Cars (1980), a critically acclaimed, but mostly forgotten, Kurt Russell/Jack Warden comedy about devious used-car dealers. Spielberg hit gold yet one more time with Raiders of the Lost Ark (1981), with Harrison Ford taking the part of Indiana Jones. Spielberg produced and directed two films in 1982. The first was Poltergeist (1982), but the highest-grossing movie of all time up to that point was the alien story E.T. the Extra-Terrestrial (1982). Spielberg also helped pioneer the practice of product placement. The concept, while not uncommon, was still relatively low-key when Spielberg raised the practice to almost an art form with his famous (or infamous) placement of Reese's Pieces in "E.T." Spielberg was also one of the pioneers of the big-grossing special-effects movies, like "E.T." and "Close Encounters", where a very strong emphasis on special effects was placed for the first time on such a huge scale. In 1984, Spielberg followed up "Raiders" with Indiana Jones and the Temple of Doom (1984), which was a commercial success but did not receive the critical acclaim of its predecessor. As a producer, Spielberg took on many projects in the 1980s, such as The Goonies (1985), and was the brains behind the little monsters in Gremlins (1984). He also produced the cartoon An American Tail (1986), a quaint little animated classic. His biggest effort as producer in 1985, however, was the blockbuster Back to the Future (1985), which made Michael J. Fox an instant superstar. As director, Spielberg took on the book The Color Purple (1985), with Whoopi Goldberg and Oprah Winfrey, with great success. In the latter half of the 1980s, he also directed Empire of the Sun (1987), a mixed success for the occasionally erratic Spielberg. Success would not escape him for long, though.
                    
                    The late 1980s found Spielberg's projects at the center of pop-culture yet again. In 1988, he produced the landmark animation/live-action film Who Framed Roger Rabbit (1988). The next year proved to be another big one for Spielberg, as he produced and directed Always (1989) as well as Indiana Jones and the Last Crusade (1989), and Back to the Future Part II (1989). All three of the films were box-office and critical successes. Also, in 1989, he produced the little known comedy-drama Dad (1989), with Jack Lemmon and Ted Danson, which got mostly mixed results. Spielberg has also had an affinity for animation and has been a strong voice in animation in the 1990s. Aside from producing the landmark "Who Framed Roger Rabbit", he produced the animated series Tiny Toon Adventures (1990), Animaniacs (1993), Pinky and the Brain (1995), Freakazoid! (1995), Pinky, Elmyra & the Brain (1998), Family Dog (1993) and Toonsylvania (1998). Spielberg also produced other cartoons such as The Land Before Time (1988), We're Back! A Dinosaur's Story (1993), Casper (1995) (the live action version) as well as the live-action version of The Flintstones (1994), where he was credited as "Steven Spielrock". Spielberg also produced many Roger Rabbit short cartoons, and many Pinky and the Brain, Animaniacs and Tiny Toons specials. Spielberg was very active in the early 1990s, as he directed Hook (1991) and produced such films as the cute fantasy Joe Versus the Volcano (1990) and An American Tail: Fievel Goes West (1991). He also produced the unusual comedy thriller Arachnophobia (1990), Back to the Future Part III (1990) and Gremlins 2: The New Batch (1990). While these movies were big successes in their own right, they did not quite bring in the kind of box office or critical acclaim as previous efforts. In 1993, Spielberg directed Jurassic Park (1993), which for a short time held the record as the highest grossing movie of all time, but did not have the universal appeal of his previous efforts. Big box-office spectacles were not his only concern, though. He produced and directed Schindler's List (1993), a stirring film about the Holocaust. He won best director at the Oscars, and also got Best Picture. In the mid-90s, he helped found the production company DreamWorks, which was responsible for many box-office successes.
                    
                    As a producer, he was very active in the late 90s, responsible for such films as The Mask of Zorro (1998), Men in Black (1997) and Deep Impact (1998). However, it was on the directing front that Spielberg was in top form. He directed and produced the epic Amistad (1997), a spectacular film that was shorted at the Oscars and in release due to the fact that its release date was moved around so much in late 1997. The next year, however, produced what many believe was one of the best films of his career: Saving Private Ryan (1998), a film about World War Two that is spectacular in almost every respect. It was stiffed at the Oscars, losing best picture to Shakespeare in Love (1998).
                    
                    Spielberg produced a series of films, including Evolution (2001), The Haunting (1999) and Shrek (2001). he also produced two sequels to Jurassic Park (1993), which were financially but not particularly critical successes. In 2001, he produced a mini-series about World War Two that definitely *was* a financial and critical success: Band of Brothers (2001), a tale of an infantry company from its parachuting into France during the invasion to the Battle of the Bulge. Also in that year, Spielberg was back in the director's chair for A.I. Artificial Intelligence (2001), a movie with a message and a huge budget. It did reasonably at the box office and garnered varied reviews from critics.
                    
                    Spielberg has been extremely active in films there are many other things he has done as well. He produced the short-lived TV series SeaQuest 2032 (1993), an anthology series entitled Amazing Stories (1985), created the video-game series "Medal of Honor" set during World War Two, and was a starting producer of ER (1994). Spielberg, if you haven't noticed, has a great interest in World War Two. He and Tom Hanks collaborated on Shooting War: World War II Combat Cameramen (2000), a documentary about World War II combat photographers, and he produced a documentary about the Holocaust called Eyes of the Holocaust (2000). With all of this to Spielberg's credit, it's no wonder that he's looked at as one of the greatest ever figures in entertainment.`
                }
            ],
        'Genres':
            [
                {
                    'Name': 'Action',
                    'Description': `Associated with particular types of spectacle (e.g., explosions, chases, combat).`
                },
                {
                    'Name': 'Adventure',
                    'Description': `Implies a narrative that is defined by a journey (often including some form of pursuit) and is usually located within a fantasy or exoticized setting. Typically, though not always, such stories include the quest narrative. The predominant emphasis on violence and fighting in action films is the typical difference between the two genres.`
                }
            ],
    },
    {
        'Title': `The Princess Bride`,
        'Year': '1987',
        'Image': 'https://www.imdb.com/title/tt0093779/mediaviewer/rm3845855233/?ref_=ext_shr_lnk',
        'Description': `A bedridden boy's grandfather reads him the story of a farmboy-turned-pirate who encounters numerous obstacles, enemies and allies in his quest to be reunited with his true love.`,
        'Directors':
            [
                {
                    'Name': 'Rob Reiner',
                    'Birth': '1947',
                    'Death': '',
                    'Bio': `Robert Reiner was born in New York City, to Estelle Reiner (née Lebost) and Emmy-winning actor, comedian, writer, and producer Carl Reiner.

                    As a child, his father was his role model, as Carl Reiner created and starred in The Dick Van Dyke Show. Estelle was also an inspiration for him to become a director; her experience as a singer helped him understand how music was used in a scene. Rob often felt pressured about measuring up to his father's successful streak, with twelve Emmys and other prestigious awards.
                    
                    When Rob graduated high school, his parents advised him to participate in Summer Theatre. Reiner got a job as an apprentice in the Bucks County Playhouse in Pennsylvania. He went on to UCLA Film School to further his education. Reiner felt he still wasn't successful even having a recurring role on one of the biggest shows in the country, All in the Family. He began his directing career with the Oscar-nominated films This Is Spinal Tap, Stand By Me, and The Princess Bride.
                    
                    In 1987, with these successful box-office movies under his belt, Reiner founded his own production company, Castle Rock Entertainment; along with Martin Shafer, Andrew Scheinman, Glenn Padnick, and Alan Horn. Under Castle Rock Entertainment, he went to direct Oscar-nominated films When Harry Met Sally, Misery, and A Few Good Men. Reiner has credited former co-star Carroll O'Connor in helping him get into the directing business, showing Reiner the ropes.
                    
                    Reiner is known as a political activist, co-founding the American Foundation For Equal Rights, a group that was an advisory for same-sex-marriage. He has spoken at several rallies on several topics, an advocate for social change regarding such issues as domestic violence and tobacco use.
                    
                    Reiner made cameo appearances on television shows 30 Rock, The Simpsons, and Hannah Montana, and in films The First Wives Club, Bullets Over Broadway, Primary Colors, and Throw Momma From The Train, among many others.`
                }
            ],
        'Genres':
            [
                {
                    'Name': 'Adventure',
                    'Description': `Implies a narrative that is defined by a journey (often including some form of pursuit) and is usually located within a fantasy or exoticized setting. Typically, though not always, such stories include the quest narrative. The predominant emphasis on violence and fighting in action films is the typical difference between the two genres.`
                },
                {
                    'Name': 'Comedy',
                    'Description': `Defined by events that are primarily intended to make the audience laugh.`
                },
                {
                    'Name': 'Family',
                    'Description': `A children's film, or family film, is a film genre that contains children or relates to them in the context of home and family. Children's films are made specifically for children and not necessarily for a general audience, while family films are made for a wider appeal with a general audience in mind.`
                }
            ],
    },
    {
        'Title': `The Count of Monte Cristo`,
        'Year': '2002',
        'Image': 'https://www.imdb.com/title/tt0245844/mediaviewer/rm3545959936/?ref_=ext_shr_lnk',
        'Description': `A young man, falsely imprisoned by his jealous "friend", escapes and uses a hidden treasure to exact his revenge.`,
        'Directors':
            [
                {
                    'Name': 'Kevin Reynolds',
                    'Birth': '1952',
                    'Death': '',
                    'Bio': `Raised as an Air Force brat, Kevin Reynolds' love for cinema inspired him to forsake his law school degree and move to Los Angeles to enroll in the University of Southern California's legendary film school. Reynolds' graduate thesis film "Proof" became the basis for "Fandango" starring Kevin Costner and was produced by Steve Spielberg's Amblin Entertainment as one of its first productions. During his time at USC, Reynolds also wrote the Cold War cult hit "Red Dawn," which John Milius directed.

                    Reynolds also directed "The Beast," "Robin Hood: Prince of Thieves," "Rapa Nui," "Waterworld," "The Count of Monte Cristo," "Tristan + Isolde," and "One Eight Seven," as well as the "You Gotta Believe Me" episode of Spielberg's anthology television series, "Amazing Stories."
                    
                    Most recently, Reynolds directed 'Hatfields & McCoys' for History Channel and Sony Pictures Television.`
                }
            ],
        'Genres':
            [
                {
                    'Name': 'Action',
                    'Description': `Associated with particular types of spectacle (e.g., explosions, chases, combat).`
                },
                {
                    'Name': 'Adventure',
                    'Description': `Implies a narrative that is defined by a journey (often including some form of pursuit) and is usually located within a fantasy or exoticized setting. Typically, though not always, such stories include the quest narrative. The predominant emphasis on violence and fighting in action films is the typical difference between the two genres.`
                },
                {
                    'Name': 'Drama',
                    'Description': `Focused on emotions and defined by conflict, often looking to reality rather than sensationalism.`
                }
            ],
    },
    {
        'Title': `The Dark Knight`,
        'Year': '2008',
        'Image': 'https://www.imdb.com/title/tt0468569/mediaviewer/rm4023877632/?ref_=ext_shr_lnk',
        'Description': `When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.`,
        'Directors':
            [
                {
                    'Name': 'Christopher Nolan',
                    'Birth': '1970',
                    'Death': '',
                    'Bio': `Best known for his cerebral, often nonlinear, storytelling, acclaimed writer-director Christopher Nolan was born on July 30, 1970, in London, England. Over the course of 15 years of filmmaking, Nolan has gone from low-budget independent films to working on some of the biggest blockbusters ever made.

                    At 7 years old, Nolan began making short movies with his father's Super-8 camera. While studying English Literature at University College London, he shot 16-millimeter films at U.C.L.'s film society, where he learned the guerrilla techniques he would later use to make his first feature, Following (1998), on a budget of around $6,000. The noir thriller was recognized at a number of international film festivals prior to its theatrical release and gained Nolan enough credibility that he was able to gather substantial financing for his next film.
                    
                    Nolan's second film was Memento (2000), which he directed from his own screenplay based on a short story by his brother Jonathan. Starring Guy Pearce, the film brought Nolan numerous honors, including Academy Award and Golden Globe Award nominations for Best Original Screenplay. Nolan went on to direct the critically acclaimed psychological thriller, Insomnia (2002), starring Al Pacino, Robin Williams and Hilary Swank.
                    
                    The turning point in Nolan's career occurred when he was awarded the chance to revive the Batman franchise in 2005. In Batman Begins (2005), Nolan brought a level of gravitas back to the iconic hero, and his gritty, modern interpretation was greeted with praise from fans and critics alike. Before moving on to a Batman sequel, Nolan directed, co-wrote, and produced the mystery thriller The Prestige (2006), starring Christian Bale and Hugh Jackman as magicians whose obsessive rivalry leads to tragedy and murder.
                    
                    In 2008, Nolan directed, co-wrote, and produced The Dark Knight (2008) which went on to gross more than a billion dollars at the worldwide box office. Nolan was nominated for a Directors Guild of America (D.G.A.) Award, Writers Guild of America (W.G.A.) Award and Producers Guild of America (P.G.A.) Award, and the film also received eight Academy Award nominations.
                    
                    In 2010, Nolan captivated audiences with the sci-fi thriller Inception (2010), which he directed and produced from his own original screenplay. The thought-provoking drama was a worldwide blockbuster, earning more than $800,000,000 and becoming one of the most discussed and debated films of the year. Among its many honors, Inception received four Academy Awards and eight nominations, including Best Picture and Best Screenplay. Nolan was recognized by his peers with D.G.A. and P.G.A. Award nominations, as well as a W.G.A. Award for his work on the film.
                    
                    One of the best-reviewed and highest-grossing movies of 2012, The Dark Knight Rises (2012) concluded Nolan's Batman trilogy. Due to his success rebooting the Batman character, Warner Bros. enlisted Nolan to produce their revamped Superman movie Man of Steel (2013), which opened in the summer of 2013. In 2014, Nolan directed, wrote, and produced the science-fiction epic Interstellar (2014), starring Matthew McConaughey, Anne Hathaway and Jessica Chastain. Paramount Pictures and Warner Bros. released the film on November 5, 2014, to positive reviews and strong box-office results, grossing over $670 million dollars worldwide.
                    
                    Nolan resides in Los Angeles, California with his wife, producer Emma Thomas, and their children. Nolan and Thomas also have their own production company, Syncopy.`
                }
            ],
        'Genres':
            [
                {
                    'Name': 'Action',
                    'Description': `Associated with particular types of spectacle (e.g., explosions, chases, combat).`
                },
                {
                    'Name': 'Crime',
                    'Description': `Crime films, in the broadest sense, is a film genre inspired by and analogous to the crime fiction literary genre. Films of this genre generally involve various aspects of crime and its detection.`
                },
                {
                    'Name': 'Drama',
                    'Description': `Focused on emotions and defined by conflict, often looking to reality rather than sensationalism.`
                }
            ],
    },
    {
        'Title': `Iron Man`,
        'Year': '2008',
        'Image': 'https://www.imdb.com/title/tt0371746/mediaviewer/rm1544850432/?ref_=ext_shr_lnk',
        'Description': `After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.`,
        'Directors':
            [
                {
                    'Name': 'Jon Favreau',
                    'Birth': '1966',
                    'Death': '',
                    'Bio': `Initially an indie film favorite, actor Jon Favreau has progressed to strong mainstream visibility into the millennium and, after nearly two decades in the business, is still enjoying character stardom as well as earning notice as a writer/producer/director.

                    The amiable, husky-framed actor with the tight, crinkly hair was born in Queens, New York on October 19, 1966, the only child of Madeleine (Balkoff), an elementary school teacher, and Charles Favreau, a special education teacher. His father has French-Canadian, German, and Italian ancestry, and his mother was from a Russian Jewish family. He attended the Bronx High School of Science before furthering his studies at Queens College in 1984. Dropping out just credits away from receiving his degree, Jon moved to Chicago where he focused on comedy and performed at several Chicago improvisational theaters, including the ImprovOlympic and the Improv Institute. He also found a couple of bit parts in films.
                    
                    While there, he earned another bit role in the film, Rudy (1993), and met fellow cast mate Vince Vaughn. Their enduring personal friendship would play an instrumental role in furthering both their professional careers within just a few years. Jon broke into TV with a role on the classic series, Seinfeld (1989) (as "Eric the Clown"). After filming rudimentary roles in the movies Mrs. Parker and the Vicious Circle (1994), Notes from Underground (1995) and Batman Forever (1995), he decided to do some risk taking by writing himself and friend Vaughn into what would become their breakthrough film. Swingers (1996), which he also co-produced, centers on Jon as a luckless, struggling actor type who is emotionally shattered after losing his girlfriend, but is pushed back into the L.A. social scene via the help of cool, worldly, outgoing actor/buddy Vaughn. These two blueprint roles went on to define the character types of both actors on film.
                    
                    In 1997, Jon appeared favorably on several episodes of the popular TV sitcom, Friends (1994), as "Pete Becker", the humdrum but extremely wealthy suitor for Courteney Cox's "Monica" character, and also appeared to fine advantage on the Tracey Takes On... (1996) comedy series. He later took on the biopic mini-movie, Rocky Marciano (1999), portraying the prizefighter himself in a highly challenging dramatic role and received excellent reviews. Other engagingly offbeat "everyman" films roles came Jon's way -- the ex-athlete in the working class film, Dogtown (1997); a soon-to-be groom whose bachelor party goes horribly awry in the comedy thriller Very Bad Things (1998); a newlywed opposite Famke Janssen in Love & Sex (2000); a wild and crazy linebacker in The Replacements (2000); as Ben Affleck's legal partner in Daredevil (2003); and another down-and-out actor in The Big Empty (2003). He wrote and directed himself and Vaughn as two fellow boxers who involve themselves in criminal activity in Made (2001). Both he and Vaughn produced. He also directed the highly popular Will Ferrell comedy Elf (2003), in which he had a small part.
                    
                    Jon went on to re-team favorably with his friend, Vince Vaughn, who enjoyed a meteoric rise into the comedy star ranks, in such light-weight features as The Break-Up (2006), Four Christmases (2008) and Couples Retreat (2009), the last of which he co-wrote with Vaughn.
                    
                    Jon has made even greater strides as a writer, producer and/or director in recent years with the exciting mega-box office action-packed Iron Man (2008), starring Robert Downey Jr., and its sequels, Iron Man 2 (2010) and Iron Man 3 (2013). Jon's character of "Happy Hogan" would be featured in a number of Marvel Comic adventures. Other offerings behind the scenes have included the adventure dramedy Chef (2014), in which he also starred in the title role; the revamped film version of The Avengers (2012) also starring Downey Jr., and it's sequels Avengers: Age of Ultron (2015), Avengers: Infinity War (2018) and Avengers: Endgame (2019); and the animated Disney features The Jungle Book (2016) and The Lion King (2019) and the TV series The Chef Show (2019).
                    
                    Favreau's marriage to Joya Tillem on November 24, 2000, produced son Max and two daughters, Madeleine and Brighton Rose. Joya is the niece of KGO (AM) lawyer and talk show host, Len Tillem. On the sly, the actor/writer/producer/director enjoys playing on the World Poker Tour.`
                }
            ],
        'Genres':
            [
                {
                    'Name': 'Action',
                    'Description': `Associated with particular types of spectacle (e.g., explosions, chases, combat).`
                },
                {
                    'Name': 'Adventure',
                    'Description': `Implies a narrative that is defined by a journey (often including some form of pursuit) and is usually located within a fantasy or exoticized setting. Typically, though not always, such stories include the quest narrative. The predominant emphasis on violence and fighting in action films is the typical difference between the two genres.`
                },
                {
                    'Name': 'Sci-Fi',
                    'Description': `Films are defined by a combination of imaginative speculation and a scientific or technological premise, making use of the changes and trajectory of technology and science.`
                }
            ],
    },
    {
        'Title': `The Court Jester`,
        'Year': '1956',
        'Image': 'https://www.imdb.com/title/tt0049096/mediaviewer/rm2466255872/?ref_=ext_shr_lnk',
        'Description': `A hapless carnival performer masquerades as the court jester as part of a plot against an evil ruler who has overthrown the rightful King.`,
        'Directors':
            [
                {
                    'Name': 'Melvin Frank',
                    'Birth': '1913',
                    'Death': '1988',
                    'Bio': `Melvin Frank was half of a famous screenwriting partnership. The other half of the collaborative effort was Norman Panama. The two men became close friends while attending the University of Chicago. Frank had initially pursued a degree in engineering, but was persuaded by Panama to switch to English instead. In 1938 he and Panama moved to Hollywood and embarked on a career writing radio scripts and gags for Bob Hope and Milton Berle. Specializing in light comedy, they came up with the original story line for Hope's My Favorite Blonde (1942). This opened the door for a joint screenwriting contract with Paramount (1941-46), their prolific work together culminating in an Oscar nomination for the popular Bob Hope-Bing Crosby vehicle, Road to Utopia (1945).

                    Continuing their run of witty comedies, Frank and Panama next wrote and produced the Cary Grant-Myrna Loy box-office hit Mr. Blandings Builds His Dream House (1948), adapted from a satirical novel by Eric Hodgins (about a couple whose dream of home ownership turns into a nightmare). From then on Frank and Panama alternated as directors and producers, first at MGM (1950-52), then at Paramount (1954-59). Of some ten top-grossing collaborations, their most rewarding effort was the highly entertaining medieval adventure spoof, The Court Jester (1955), starring Danny Kaye, lavishly filmed in VistaVision and Technicolor. They also turned out an award-winning Broadway play, "Li'l Abner", based on a comic strip by Al Capp. It premiered in November 1956 and ran for 653 performances over 87 weeks, before closing in July 1958. Frank and Panama brought it to the screen (Li'l Abner (1959)) the following year.
                    
                    The successful partnership came to an end with the final installment in the Hope-Crosby "road pictures", The Road to Hong Kong (1962). Subsequently, Frank and Panama--cordially--went their separate ways, Frank becoming a solo director and (from 1965) producer, but continuing to write comedy scripts in conjunction with others. In retrospect, his career over the next two decades was by far the more productive of the two, encompassing as producer/director the bittersweet adaptation of a play by Neil Simon, The Prisoner of Second Avenue (1975); and as producer/director/writer of the popular sex comedy A Touch of Class (1973), nominated for an Academy Award as Best Picture.`
                },
                {
                    'Name': 'Norman Panama',
                    'Birth': '1914',
                    'Death': '2003',
                    'Bio': `Norman Panama was born on April 21, 1914 in Chicago, Illinois, USA. He was a writer and director, known for Knock on Wood (1954), Mr. Blandings Builds His Dream House (1948) and Above and Beyond (1952). He died on January 13, 2003 in Los Angeles, California, USA.`
                }
            ],
        'Genres':
            [
                {
                    'Name': 'Adventure',
                    'Description': `Implies a narrative that is defined by a journey (often including some form of pursuit) and is usually located within a fantasy or exoticized setting. Typically, though not always, such stories include the quest narrative. The predominant emphasis on violence and fighting in action films is the typical difference between the two genres.`
                },
                {
                    'Name': 'Comedy',
                    'Description': `Defined by events that are primarily intended to make the audience laugh.`
                },
                {
                    'Name': 'Family',
                    'Description': `A children's film, or family film, is a film genre that contains children or relates to them in the context of home and family. Children's films are made specifically for children and not necessarily for a general audience, while family films are made for a wider appeal with a general audience in mind.`
                }
            ],
    },
    {
        'Title': `For a Few Dollars More`,
        'Year': '1965',
        'Image': 'https://www.imdb.com/title/tt0059578/mediaviewer/rm3878294529/?ref_=ext_shr_lnk',
        'Description': `Two bounty hunters with the same intentions team up to track down an escaped Mexican outlaw.`,
        'Directors':
            [
                {
                    'Name': 'Sergio Leone',
                    'Birth': '1929',
                    'Death': '1989',
                    'Bio': `Sergio Leone was virtually born into the cinema - he was the son of Roberto Roberti (A.K.A. Vincenzo Leone), one of Italy's cinema pioneers, and actress Bice Valerian. Leone entered films in his late teens, working as an assistant director to both Italian directors and U.S. directors working in Italy (usually making Biblical and Roman epics, much in vogue at the time). Towards the end of the 1950s he started writing screenplays, and began directing after taking over The Last Days of Pompeii (1959) in mid-shoot after its original director fell ill. His first solo feature, The Colossus of Rhodes (1961), was a routine Roman epic, but his second feature, A Fistful of Dollars (1964), a shameless remake of Akira Kurosawa's Yojimbo (1961), caused a revolution. It was the first Spaghetti Western, and shot T.V. cowboy Clint Eastwood to stardom (Leone wanted Henry Fonda or Charles Bronson but couldn't afford them). The two sequels, For a Few Dollars More (1965) and The Good, the Bad and the Ugly (1966), were shot on much higher budgets and were even more successful, though his masterpiece, Once Upon a Time in the West (1968), in which Leone finally worked with Fonda and Bronson, was mutilated by Paramount Pictures and flopped at the U.S. box office. He directed Duck, You Sucker! (1971) reluctantly (as producer he hired Peter Bogdanovich to direct but he left before shooting began), and turned down offers to direct The Godfather (1972) in favor of his dream project, which became Once Upon a Time in America (1984). He died in 1989 after preparing an even more expensive Soviet co-production on the World War II siege of Leningrad.`
                }
            ],
        'Genres':
            [
                {
                    'Name': 'Drama',
                    'Description': `Focused on emotions and defined by conflict, often looking to reality rather than sensationalism.`
                },
                {
                    'Name': 'Western',
                    'Description': `A genre in which films are set in the American West during the 19th century.`
                }
            ],
    },
    {
        'Title': `The Santa Clause`,
        'Year': '1994',
        'Image': 'https://www.imdb.com/title/tt0111070/mediaviewer/rm3513201664/?ref_=ext_shr_lnk',
        'Description': `When a man inadvertently makes Santa fall off his roof on Christmas Eve, he finds himself magically recruited to take his place.`,
        'Directors':
            [
                {
                    'Name': 'John Pasquin',
                    'Birth': '1945',
                    'Death': '',
                    'Bio': `John Pasquin was born on June 8, 1945. He is a director and producer, known for The Santa Clause (1994), Miss Congeniality 2: Armed & Fabulous (2005) and Home Improvement (1991). He has been married to JoBeth Williams since March 14, 1982. They have two children.`
                }
            ],
        'Genres':
            [
                {
                    'Name': 'Comedy',
                    'Description': `Defined by events that are primarily intended to make the audience laugh.`
                },
                {
                    'Name': 'Drama',
                    'Description': `Focused on emotions and defined by conflict, often looking to reality rather than sensationalism.`
                },
                {
                    'Name': 'Family',
                    'Description': `A children's film, or family film, is a film genre that contains children or relates to them in the context of home and family. Children's films are made specifically for children and not necessarily for a general audience, while family films are made for a wider appeal with a general audience in mind.`
                }
            ],
    },
    {
        'Title': `Dungeons & Dragons: Honor Among Thieves`,
        'Year': '2023',
        'Image': 'https://www.imdb.com/title/tt2906216/mediaviewer/rm1384459265/?ref_=ext_shr_lnk',
        'Description': `A charming thief and a band of unlikely adventurers embark on an epic quest to retrieve a long lost relic, but their charming adventure goes dangerously awry when they run afoul of the wrong people.`,
        'Directors':
            [
                {
                    'Name': 'John Francis Daley',
                    'Birth': '1985',
                    'Death': '',
                    'Bio': `John Francis Daley began acting in the national and international tour of The Who's Tommy, playing young Tommy - and coming to national prominence in the critically acclaimed, cult classic series, Freaks and Geeks (1999). Formerly a regular on the Fox hit, Bones (2005), John can also be seen in the Lions Gate comedy, Waiting and the upcoming Rapture-Palooza (2013), opposite Anna Kendrick and Craig Robinson.

                    Now enjoying a successful screenwriting career, with his writing partner, Jonathan Goldstein, the two have sold several scripts in the past three years, including the summer hit, Horrible Bosses (2011).
                    
                    As well as being an actor and screenwriter, John is also a musician, playing keyboard and singing lead vocals in his band, Dayplayer soon to release their first CD.`
                },
                {
                    'Name': 'Jonathan Goldstein',
                    'Birth': '1968',
                    'Death': '',
                    'Bio': `Jonathan Goldstein was born on September 2, 1968 in New York City, New York, USA. He is a director and writer, known for Spider-Man: Homecoming (2017), Horrible Bosses (2011) and Game Night (2018). He has been married to Adena Halpern since August 26, 2007. They have one child.`
                }
            ],
        'Genres':
            [
                {
                    'Name': 'Action',
                    'Description': `Associated with particular types of spectacle (e.g., explosions, chases, combat).`
                },
                {
                    'Name': 'Adventure',
                    'Description': `Implies a narrative that is defined by a journey (often including some form of pursuit) and is usually located within a fantasy or exoticized setting. Typically, though not always, such stories include the quest narrative. The predominant emphasis on violence and fighting in action films is the typical difference between the two genres.`
                },
                {
                    'Name': 'Fantasy',
                    'Description': `Films defined by situations that transcend natural laws and/or by settings inside a fictional universe, with narratives that are often inspired by or involve human myths.`
                }
            ],
    },
    {
        'Title': `Secondhand Lions`,
        'Year': '2003',
        'Image': 'https://www.imdb.com/title/tt0327137/mediaviewer/rm2306678784/?ref_=ext_shr_lnk',
        'Description': `A shy adolescent boy, Walter (Haley Joel Osment), is taken by his greedy mother (Kyra Sedgwick) to spend the summer with his two hard-boiled great-uncles, Hub (Robert Duvall) and Garth (Michael Caine), who are rumored to possess a great fortune. At first, the two old men, both set in their ways, find Walter's presence a nuisance, but they eventually warm up to the boy and regale him with tall tales from their past. In return, Walter helps reawaken their youthful spirit.`,
        'Directors':
            [
                {
                    'Name': 'Tim McCanlies',
                    'Birth': '1953',
                    'Death': '',
                    'Bio': `Tim McCanlies was born in 1953. He is a writer and director, known for The Iron Giant (1999), Dancer, Texas Pop. 81 (1998) and Secondhand Lions (2003).`
                }
            ],
        'Genres':
            [
                {
                    'Name': 'Comedy',
                    'Description': `Defined by events that are primarily intended to make the audience laugh.`
                },
                {
                    'Name': 'Drama',
                    'Description': `Focused on emotions and defined by conflict, often looking to reality rather than sensationalism.`
                },
                {
                    'Name': 'Family',
                    'Description': `A children's film, or family film, is a film genre that contains children or relates to them in the context of home and family. Children's films are made specifically for children and not necessarily for a general audience, while family films are made for a wider appeal with a general audience in mind.`
                }
            ],
    },
    {
        'Title': `Lilo & Stitch`,
        'Year': '2002',
        'Image': 'https://www.imdb.com/title/tt0275847/mediaviewer/rm3105697280/?ref_=ext_shr_lnk',
        'Description': `A young and parentless girl adopts a 'dog' from the local pound, completely unaware that it's supposedly a dangerous scientific experiment that's taken refuge on Earth and is now hiding from its creator and those who see it as a menace.`,
        'Directors':
            [
                {
                    'Name': 'Dean DeBlois',
                    'Birth': '1970',
                    'Death': '',
                    'Bio': `Dean DeBlois is a Canadian writer, director, and producer known best for having co-written and co-directed Disney's Lilo & Stitch (2002) and Dreamworks' How to Train Your Dragon (2010), both Oscar nominated. While working as an assistant animator and layout artist for Hinton Animation Studios in Ottawa, Ontario, DeBlois simultaneously attended Sheridan College's three year Classical Animation program. Upon graduation in 1990, DeBlois was immediately hired by Don Bluth Studios in Dublin, Ireland. There, he cut his teeth as a layout artist, character designer, and storyboard assistant to Don Bluth on such films as Thumbelina (1994) and A Troll in Central Park (1994)." In 1994, DeBlois left Ireland to work for Walt Disney Feature Animation as a storyboard artist, where he soon replaced his frequent collaborator, Chris Sanders, as Head of Story on Mulan (1998)." Shortly thereafter, they re-re-teamed to create the lush and whimsical Lilo & Stitch (2002), heralded by critics as Disney's last great hand-drawn film. Following its release in 2002, DeBlois sold several original live action feature projects to write, direct, and produce, including "The Banshee and Finn Magee," "The Lighthouse," and "Sightings," set-up at Walt Disney Pictures, Touchstone, and Universal Studios respectively. At present, all three remain in development. 2007 unveiled DeBlois' first foray into documentary filmmaking, with the acclaimed feature length music film, Sigur Rós: Heima (2007), chronicling the homecoming concert odyssey of Iceland's famed post-rock phenomenon, Sigur Rós. In October of 2008, DeBlois returned to feature animation to co-write and co-direct Dreamworks then-troubled How to Train Your Dragon (2010), once again re-teaming with Chris Sanders. The two re-envisioned the story from scratch, leading the production to its March 26, 2010 release, at break-neck speed. The resulting film earned Dreamworks Animation its highest critical acclaim to date and became the studio's top grossing film outside of the "Shrek" franchise. During this same time, DeBlois also directed another feature-length music film for Sigur Rós front-man Jónsi, entitled Go Quiet (2010), as well as a feature length concert film entitled "Jónsi: Live at The Wiltern." At present, DeBlois is writing, directing, and executive producing the highly anticipated sequel to How to Train Your Dragon (2010), "which he describes as "the epic second act of a much larger story".`
                },
                {
                    'Name': 'Chris Sanders',
                    'Birth': '1962',
                    'Death': '',
                    'Bio': `Born and raised in Colorado, Chris Sanders fell in love with animation at the age of ten after seeing Ward Kimball animated shorts on 'The Wonderful World of Disney'. He began drawing, and applied to CalArts after his grandmother told him about the animation program at the school. He majored in character animation, and graduated in 1984, moving on to work at Marvel Comics. He helped draw the characters for the show _Muppet Babies (1984)_. He then moved over to the Walt Disney Company in 1987, working in the visual development department. After doing some minor work on The Rescuers Down Under (1990), Sanders catapulted to the top of Disney animation through his work on Beauty and the Beast (1991) and The Lion King (1994). He helped write the 1998 Disney animated hit Mulan (1998), which moved him into the position to write, direct, and voice Lilo & Stitch (2002). Sanders moved to Dreamworks where he co-wrote, co-directed and did character design for How to Train Your Dragon (2010). Regardless of which studio he works for, he has become a recognizable force as an animator in both cel- and CGI-based features.`
                }
            ],
        'Genres':
            [
                {
                    'Name': 'Adventure',
                    'Description': `Implies a narrative that is defined by a journey (often including some form of pursuit) and is usually located within a fantasy or exoticized setting. Typically, though not always, such stories include the quest narrative. The predominant emphasis on violence and fighting in action films is the typical difference between the two genres.`
                },
                {
                    'Name': 'Animation',
                    'Description': `A film medium in which the film's images are primarily created by computer or hand and the characters are voiced by actors. Animation can incorporate any genre and subgenre.`
                },
                {
                    'Name': 'Comedy',
                    'Description': `Defined by events that are primarily intended to make the audience laugh.`
                }
            ],
    },
    {
        'Title': `Galaxy Quest`,
        'Year': '1999',
        'Image': 'https://www.imdb.com/title/tt0177789/mediaviewer/rm2608676352/?ref_=ext_shr_lnk',
        'Description': `The alumni cast of a space opera television series have to play their roles as the real thing when an alien race needs their help. However, they also have to defend both Earth and the alien race from a reptilian warlord.`,
        'Directors':
            [
                {
                    'Name': 'Dean Parisot',
                    'Birth': '',
                    'Death': '',
                    'Bio': `Dean Parisot is known for Galaxy Quest (1999), RED 2 (2013) and Bill & Ted Face the Music (2020). He was previously married to Sally Menke.`
                }
            ],
        'Genres':
            [
                {
                    'Name': 'Adventure',
                    'Description': `Implies a narrative that is defined by a journey (often including some form of pursuit) and is usually located within a fantasy or exoticized setting. Typically, though not always, such stories include the quest narrative. The predominant emphasis on violence and fighting in action films is the typical difference between the two genres.`
                },
                {
                    'Name': 'Comedy',
                    'Description': `Defined by events that are primarily intended to make the audience laugh.`
                },
                {
                    'Name': 'Sci-Fi',
                    'Description': `Films are defined by a combination of imaginative speculation and a scientific or technological premise, making use of the changes and trajectory of technology and science.`
                }
            ],
    },
    {
        'Title': `Forrest Gump`,
        'Year': '1994',
        'Image': 'https://www.imdb.com/title/tt0109830/mediaviewer/rm1954748672/?ref_=ext_shr_lnk',
        'Description': `The history of the United States from the 1950s to the '70s unfolds from the perspective of an Alabama man with an IQ of 75, who yearns to be reunited with his childhood sweetheart.`,
        'Directors':
            [
                {
                    'Name': 'Robert Zemeckis',
                    'Birth': '1952',
                    'Death': '',
                    'Bio': `A whiz-kid with special effects, Robert is from the Spielberg camp of film-making (Steven Spielberg produced many of his films). Usually working with writing partner Bob Gale, Robert's earlier films show he has a talent for zany comedy (Romancing the Stone (1984), 1941 (1979)) and special effect vehicles (Who Framed Roger Rabbit (1988) and Back to the Future (1985)). His later films have become more serious, with the hugely successful Tom Hanks vehicle Forrest Gump (1994) and the Jodie Foster film Contact (1997), both critically acclaimed movies. Again, these films incorporate stunning effects. Robert has proved he can work a serious story around great effects.`
                }
            ],
        'Genres':
            [
                {
                    'Name': 'Drama',
                    'Description': `Focused on emotions and defined by conflict, often looking to reality rather than sensationalism.`
                },
                {
                    'Name': 'Romance',
                    'Description': `Characterized by an emphasis on passion, emotion, and the affectionate romantic involvement of the main characters, with romantic love or the search for it typically being the primary focus.`
                }
            ],
    },
    {
        'Title': `Catch Me If You Can`,
        'Year': '2002',
        'Image': 'https://www.imdb.com/title/tt0264464/mediaviewer/rm3911489536/?ref_=ext_shr_lnk',
        'Description': `Barely 21 yet, Frank is a skilled forger who has passed as a doctor, lawyer and pilot. FBI agent Carl becomes obsessed with tracking down the con man, who only revels in the pursuit.`,
        'Directors':
            [
                {
                    'Name': 'Steven Spielberg',
                    'Birth': '1946',
                    'Death': '',
                    'Bio': `One of the most influential personalities in the history of cinema, Steven Spielberg is Hollywood's best known director and one of the wealthiest filmmakers in the world. He has an extraordinary number of commercially successful and critically acclaimed credits to his name, either as a director, producer or writer since launching the summer blockbuster with Jaws (1975), and he has done more to define popular film-making since the mid-1970s than anyone else.

                    Steven Allan Spielberg was born in 1946 in Cincinnati, Ohio, to Leah Frances (Posner), a concert pianist and restaurateur, and Arnold Spielberg, an electrical engineer who worked in computer development. His parents were both born to Russian Jewish immigrant families. Steven spent his younger years in Haddon Township, New Jersey, Phoenix, Arizona, and later Saratoga, California. He went to California State University Long Beach, but dropped out to pursue his entertainment career. He gained notoriety as an uncredited assistant editor on the classic western Wagon Train (1957). Among his early directing efforts were Battle Squad (1961), which combined World War II footage with footage of an airplane on the ground that he makes you believe is moving. He also directed Escape to Nowhere (1961), which featured children as World War Two soldiers, including his sister Anne Spielberg, and The Last Gun (1959), a western. All of these were short films. The next couple of years, Spielberg directed a couple of movies that would portend his future career in movies. In 1964, he directed Firelight (1964), a movie about aliens invading a small town. In 1967, he directed Slipstream (1967), which was unfinished. However, in 1968, he directed Amblin' (1968), which featured the desert prominently, and not the first of his movies in which the desert would feature so prominently. Amblin' also became the name of his production company, which turned out such classics as E.T. the Extra-Terrestrial (1982). Spielberg had a unique and classic early directing project, Duel (1971), with Dennis Weaver. In the early 1970s, Spielberg was working on TV, directing among others such series as Rod Serling's Night Gallery (1969), Marcus Welby, M.D. (1969) and Murder by the Book (1971). All of his work in television and short films, as well as his directing projects, were just a hint of the wellspring of talent that would dazzle audiences all over the world.
                    
                    Spielberg's first major directorial effort was The Sugarland Express (1974), with Goldie Hawn, a film that marked him as a rising star. It was his next effort, however, that made him an international superstar among directors: Jaws (1975). This classic shark attack tale started the tradition of the summer blockbuster or, at least, he was credited with starting the tradition. His next film was the classic Close Encounters of the Third Kind (1977), a unique and original UFO story that remains a classic. In 1978, Spielberg produced his first film, the forgettable I Wanna Hold Your Hand (1978), and followed that effort with Used Cars (1980), a critically acclaimed, but mostly forgotten, Kurt Russell/Jack Warden comedy about devious used-car dealers. Spielberg hit gold yet one more time with Raiders of the Lost Ark (1981), with Harrison Ford taking the part of Indiana Jones. Spielberg produced and directed two films in 1982. The first was Poltergeist (1982), but the highest-grossing movie of all time up to that point was the alien story E.T. the Extra-Terrestrial (1982). Spielberg also helped pioneer the practice of product placement. The concept, while not uncommon, was still relatively low-key when Spielberg raised the practice to almost an art form with his famous (or infamous) placement of Reese's Pieces in "E.T." Spielberg was also one of the pioneers of the big-grossing special-effects movies, like "E.T." and "Close Encounters", where a very strong emphasis on special effects was placed for the first time on such a huge scale. In 1984, Spielberg followed up "Raiders" with Indiana Jones and the Temple of Doom (1984), which was a commercial success but did not receive the critical acclaim of its predecessor. As a producer, Spielberg took on many projects in the 1980s, such as The Goonies (1985), and was the brains behind the little monsters in Gremlins (1984). He also produced the cartoon An American Tail (1986), a quaint little animated classic. His biggest effort as producer in 1985, however, was the blockbuster Back to the Future (1985), which made Michael J. Fox an instant superstar. As director, Spielberg took on the book The Color Purple (1985), with Whoopi Goldberg and Oprah Winfrey, with great success. In the latter half of the 1980s, he also directed Empire of the Sun (1987), a mixed success for the occasionally erratic Spielberg. Success would not escape him for long, though.
                    
                    The late 1980s found Spielberg's projects at the center of pop-culture yet again. In 1988, he produced the landmark animation/live-action film Who Framed Roger Rabbit (1988). The next year proved to be another big one for Spielberg, as he produced and directed Always (1989) as well as Indiana Jones and the Last Crusade (1989), and Back to the Future Part II (1989). All three of the films were box-office and critical successes. Also, in 1989, he produced the little known comedy-drama Dad (1989), with Jack Lemmon and Ted Danson, which got mostly mixed results. Spielberg has also had an affinity for animation and has been a strong voice in animation in the 1990s. Aside from producing the landmark "Who Framed Roger Rabbit", he produced the animated series Tiny Toon Adventures (1990), Animaniacs (1993), Pinky and the Brain (1995), Freakazoid! (1995), Pinky, Elmyra & the Brain (1998), Family Dog (1993) and Toonsylvania (1998). Spielberg also produced other cartoons such as The Land Before Time (1988), We're Back! A Dinosaur's Story (1993), Casper (1995) (the live action version) as well as the live-action version of The Flintstones (1994), where he was credited as "Steven Spielrock". Spielberg also produced many Roger Rabbit short cartoons, and many Pinky and the Brain, Animaniacs and Tiny Toons specials. Spielberg was very active in the early 1990s, as he directed Hook (1991) and produced such films as the cute fantasy Joe Versus the Volcano (1990) and An American Tail: Fievel Goes West (1991). He also produced the unusual comedy thriller Arachnophobia (1990), Back to the Future Part III (1990) and Gremlins 2: The New Batch (1990). While these movies were big successes in their own right, they did not quite bring in the kind of box office or critical acclaim as previous efforts. In 1993, Spielberg directed Jurassic Park (1993), which for a short time held the record as the highest grossing movie of all time, but did not have the universal appeal of his previous efforts. Big box-office spectacles were not his only concern, though. He produced and directed Schindler's List (1993), a stirring film about the Holocaust. He won best director at the Oscars, and also got Best Picture. In the mid-90s, he helped found the production company DreamWorks, which was responsible for many box-office successes.
                    
                    As a producer, he was very active in the late 90s, responsible for such films as The Mask of Zorro (1998), Men in Black (1997) and Deep Impact (1998). However, it was on the directing front that Spielberg was in top form. He directed and produced the epic Amistad (1997), a spectacular film that was shorted at the Oscars and in release due to the fact that its release date was moved around so much in late 1997. The next year, however, produced what many believe was one of the best films of his career: Saving Private Ryan (1998), a film about World War Two that is spectacular in almost every respect. It was stiffed at the Oscars, losing best picture to Shakespeare in Love (1998).
                    
                    Spielberg produced a series of films, including Evolution (2001), The Haunting (1999) and Shrek (2001). he also produced two sequels to Jurassic Park (1993), which were financially but not particularly critical successes. In 2001, he produced a mini-series about World War Two that definitely *was* a financial and critical success: Band of Brothers (2001), a tale of an infantry company from its parachuting into France during the invasion to the Battle of the Bulge. Also in that year, Spielberg was back in the director's chair for A.I. Artificial Intelligence (2001), a movie with a message and a huge budget. It did reasonably at the box office and garnered varied reviews from critics.
                    
                    Spielberg has been extremely active in films there are many other things he has done as well. He produced the short-lived TV series SeaQuest 2032 (1993), an anthology series entitled Amazing Stories (1985), created the video-game series "Medal of Honor" set during World War Two, and was a starting producer of ER (1994). Spielberg, if you haven't noticed, has a great interest in World War Two. He and Tom Hanks collaborated on Shooting War: World War II Combat Cameramen (2000), a documentary about World War II combat photographers, and he produced a documentary about the Holocaust called Eyes of the Holocaust (2000). With all of this to Spielberg's credit, it's no wonder that he's looked at as one of the greatest ever figures in entertainment.`
                }
            ],
        'Genres':
            [
                {
                    'Name': 'Biography',
                    'Description': `A biographical film or biopic is a film that dramatizes the life of a non-fictional or historically-based person or people. Such films show the life of a historical person and the central character's real name is used. They differ from docudrama films and historical drama films in that they attempt to comprehensively tell a single person's life story or at least the most historically important years of their lives.`
                },
                {
                    'Name': 'Crime',
                    'Description': `Crime films, in the broadest sense, is a film genre inspired by and analogous to the crime fiction literary genre. Films of this genre generally involve various aspects of crime and its detection.`
                },
                {
                    'Name': 'Drama',
                    'Description': `Focused on emotions and defined by conflict, often looking to reality rather than sensationalism.`
                }
            ],
    }
];

let genres = [
    {
        'Name': 'Action',
        'Description': `Associated with particular types of spectacle (e.g., explosions, chases, combat).`
    },
    {
        'Name': 'Adventure',
        'Description': `Implies a narrative that is defined by a journey (often including some form of pursuit) and is usually located within a fantasy or exoticized setting. Typically, though not always, such stories include the quest narrative. The predominant emphasis on violence and fighting in action films is the typical difference between the two genres.`
    },
    {
        'Name': 'Fantasy',
        'Description': `Films defined by situations that transcend natural laws and/or by settings inside a fictional universe, with narratives that are often inspired by or involve human myths.`
    },
    {
        'Name': 'Comedy',
        'Description': `Defined by events that are primarily intended to make the audience laugh.`
    },
    {
        'Name': 'Family',
        'Description': `A children's film, or family film, is a film genre that contains children or relates to them in the context of home and family. Children's films are made specifically for children and not necessarily for a general audience, while family films are made for a wider appeal with a general audience in mind.`
    },
    {
        'Name': 'Drama',
        'Description': `Focused on emotions and defined by conflict, often looking to reality rather than sensationalism.`
    },
    {
        'Name': 'Crime',
        'Description': `Crime films, in the broadest sense, is a film genre inspired by and analogous to the crime fiction literary genre. Films of this genre generally involve various aspects of crime and its detection.`
    },
    {
        'Name': 'Sci-Fi',
        'Description': `Films are defined by a combination of imaginative speculation and a scientific or technological premise, making use of the changes and trajectory of technology and science.`
    },
    {
        'Name': 'Western',
        'Description': `A genre in which films are set in the American West during the 19th century.`
    },
    {
        'Name': 'Animation',
        'Description': `A film medium in which the film's images are primarily created by computer or hand and the characters are voiced by actors. Animation can incorporate any genre and subgenre.`
    },
    {
        'Name': 'Romance',
        'Description': `Characterized by an emphasis on passion, emotion, and the affectionate romantic involvement of the main characters, with romantic love or the search for it typically being the primary focus.`
    },
    {
        'Name': 'Biography',
        'Description': `A biographical film or biopic is a film that dramatizes the life of a non-fictional or historically-based person or people. Such films show the life of a historical person and the central character's real name is used. They differ from docudrama films and historical drama films in that they attempt to comprehensively tell a single person's life story or at least the most historically important years of their lives.`
    }
];

let directors = [
    {
        'Name': 'Irvin Kershner',
        'Birth': '1923',
        'Death': '2010',
        'Bio': `Irvin Kershner was born on April 29, 1923 in Philadelphia, Pennsylvania. A graduate of the University of Southern California film school, Kershner began his career in 1950, producing documentaries for the United States Information Service in the Middle East. He later turned to television, directing and photographing a series of documentaries called "Confidential File". Kershner was one of the directors given his first break by producer Roger Corman, for whom he shot Stakeout on Dope Street (1958). The main theme that runs through many of his films is social alienation and human weaknesses - although his biggest commercial success was the science fiction blockbuster Star Wars: Episode V - The Empire Strikes Back (1980). Irvin Kershner died at age 87 of lung cancer in his home in Los Angeles, California on November 27, 2010.`
    },
    {
        'Name': 'Steven Spielberg',
        'Birth': '1946',
        'Death': '',
        'Bio': `One of the most influential personalities in the history of cinema, Steven Spielberg is Hollywood's best known director and one of the wealthiest filmmakers in the world. He has an extraordinary number of commercially successful and critically acclaimed credits to his name, either as a director, producer or writer since launching the summer blockbuster with Jaws (1975), and he has done more to define popular film-making since the mid-1970s than anyone else.

        Steven Allan Spielberg was born in 1946 in Cincinnati, Ohio, to Leah Frances (Posner), a concert pianist and restaurateur, and Arnold Spielberg, an electrical engineer who worked in computer development. His parents were both born to Russian Jewish immigrant families. Steven spent his younger years in Haddon Township, New Jersey, Phoenix, Arizona, and later Saratoga, California. He went to California State University Long Beach, but dropped out to pursue his entertainment career. He gained notoriety as an uncredited assistant editor on the classic western Wagon Train (1957). Among his early directing efforts were Battle Squad (1961), which combined World War II footage with footage of an airplane on the ground that he makes you believe is moving. He also directed Escape to Nowhere (1961), which featured children as World War Two soldiers, including his sister Anne Spielberg, and The Last Gun (1959), a western. All of these were short films. The next couple of years, Spielberg directed a couple of movies that would portend his future career in movies. In 1964, he directed Firelight (1964), a movie about aliens invading a small town. In 1967, he directed Slipstream (1967), which was unfinished. However, in 1968, he directed Amblin' (1968), which featured the desert prominently, and not the first of his movies in which the desert would feature so prominently. Amblin' also became the name of his production company, which turned out such classics as E.T. the Extra-Terrestrial (1982). Spielberg had a unique and classic early directing project, Duel (1971), with Dennis Weaver. In the early 1970s, Spielberg was working on TV, directing among others such series as Rod Serling's Night Gallery (1969), Marcus Welby, M.D. (1969) and Murder by the Book (1971). All of his work in television and short films, as well as his directing projects, were just a hint of the wellspring of talent that would dazzle audiences all over the world.
        
        Spielberg's first major directorial effort was The Sugarland Express (1974), with Goldie Hawn, a film that marked him as a rising star. It was his next effort, however, that made him an international superstar among directors: Jaws (1975). This classic shark attack tale started the tradition of the summer blockbuster or, at least, he was credited with starting the tradition. His next film was the classic Close Encounters of the Third Kind (1977), a unique and original UFO story that remains a classic. In 1978, Spielberg produced his first film, the forgettable I Wanna Hold Your Hand (1978), and followed that effort with Used Cars (1980), a critically acclaimed, but mostly forgotten, Kurt Russell/Jack Warden comedy about devious used-car dealers. Spielberg hit gold yet one more time with Raiders of the Lost Ark (1981), with Harrison Ford taking the part of Indiana Jones. Spielberg produced and directed two films in 1982. The first was Poltergeist (1982), but the highest-grossing movie of all time up to that point was the alien story E.T. the Extra-Terrestrial (1982). Spielberg also helped pioneer the practice of product placement. The concept, while not uncommon, was still relatively low-key when Spielberg raised the practice to almost an art form with his famous (or infamous) placement of Reese's Pieces in "E.T." Spielberg was also one of the pioneers of the big-grossing special-effects movies, like "E.T." and "Close Encounters", where a very strong emphasis on special effects was placed for the first time on such a huge scale. In 1984, Spielberg followed up "Raiders" with Indiana Jones and the Temple of Doom (1984), which was a commercial success but did not receive the critical acclaim of its predecessor. As a producer, Spielberg took on many projects in the 1980s, such as The Goonies (1985), and was the brains behind the little monsters in Gremlins (1984). He also produced the cartoon An American Tail (1986), a quaint little animated classic. His biggest effort as producer in 1985, however, was the blockbuster Back to the Future (1985), which made Michael J. Fox an instant superstar. As director, Spielberg took on the book The Color Purple (1985), with Whoopi Goldberg and Oprah Winfrey, with great success. In the latter half of the 1980s, he also directed Empire of the Sun (1987), a mixed success for the occasionally erratic Spielberg. Success would not escape him for long, though.
        
        The late 1980s found Spielberg's projects at the center of pop-culture yet again. In 1988, he produced the landmark animation/live-action film Who Framed Roger Rabbit (1988). The next year proved to be another big one for Spielberg, as he produced and directed Always (1989) as well as Indiana Jones and the Last Crusade (1989), and Back to the Future Part II (1989). All three of the films were box-office and critical successes. Also, in 1989, he produced the little known comedy-drama Dad (1989), with Jack Lemmon and Ted Danson, which got mostly mixed results. Spielberg has also had an affinity for animation and has been a strong voice in animation in the 1990s. Aside from producing the landmark "Who Framed Roger Rabbit", he produced the animated series Tiny Toon Adventures (1990), Animaniacs (1993), Pinky and the Brain (1995), Freakazoid! (1995), Pinky, Elmyra & the Brain (1998), Family Dog (1993) and Toonsylvania (1998). Spielberg also produced other cartoons such as The Land Before Time (1988), We're Back! A Dinosaur's Story (1993), Casper (1995) (the live action version) as well as the live-action version of The Flintstones (1994), where he was credited as "Steven Spielrock". Spielberg also produced many Roger Rabbit short cartoons, and many Pinky and the Brain, Animaniacs and Tiny Toons specials. Spielberg was very active in the early 1990s, as he directed Hook (1991) and produced such films as the cute fantasy Joe Versus the Volcano (1990) and An American Tail: Fievel Goes West (1991). He also produced the unusual comedy thriller Arachnophobia (1990), Back to the Future Part III (1990) and Gremlins 2: The New Batch (1990). While these movies were big successes in their own right, they did not quite bring in the kind of box office or critical acclaim as previous efforts. In 1993, Spielberg directed Jurassic Park (1993), which for a short time held the record as the highest grossing movie of all time, but did not have the universal appeal of his previous efforts. Big box-office spectacles were not his only concern, though. He produced and directed Schindler's List (1993), a stirring film about the Holocaust. He won best director at the Oscars, and also got Best Picture. In the mid-90s, he helped found the production company DreamWorks, which was responsible for many box-office successes.
        
        As a producer, he was very active in the late 90s, responsible for such films as The Mask of Zorro (1998), Men in Black (1997) and Deep Impact (1998). However, it was on the directing front that Spielberg was in top form. He directed and produced the epic Amistad (1997), a spectacular film that was shorted at the Oscars and in release due to the fact that its release date was moved around so much in late 1997. The next year, however, produced what many believe was one of the best films of his career: Saving Private Ryan (1998), a film about World War Two that is spectacular in almost every respect. It was stiffed at the Oscars, losing best picture to Shakespeare in Love (1998).
        
        Spielberg produced a series of films, including Evolution (2001), The Haunting (1999) and Shrek (2001). he also produced two sequels to Jurassic Park (1993), which were financially but not particularly critical successes. In 2001, he produced a mini-series about World War Two that definitely *was* a financial and critical success: Band of Brothers (2001), a tale of an infantry company from its parachuting into France during the invasion to the Battle of the Bulge. Also in that year, Spielberg was back in the director's chair for A.I. Artificial Intelligence (2001), a movie with a message and a huge budget. It did reasonably at the box office and garnered varied reviews from critics.
        
        Spielberg has been extremely active in films there are many other things he has done as well. He produced the short-lived TV series SeaQuest 2032 (1993), an anthology series entitled Amazing Stories (1985), created the video-game series "Medal of Honor" set during World War Two, and was a starting producer of ER (1994). Spielberg, if you haven't noticed, has a great interest in World War Two. He and Tom Hanks collaborated on Shooting War: World War II Combat Cameramen (2000), a documentary about World War II combat photographers, and he produced a documentary about the Holocaust called Eyes of the Holocaust (2000). With all of this to Spielberg's credit, it's no wonder that he's looked at as one of the greatest ever figures in entertainment.`
    },
    {
        'Name': 'Rob Reiner',
        'Birth': '1947',
        'Death': '',
        'Bio': `Robert Reiner was born in New York City, to Estelle Reiner (née Lebost) and Emmy-winning actor, comedian, writer, and producer Carl Reiner.

        As a child, his father was his role model, as Carl Reiner created and starred in The Dick Van Dyke Show. Estelle was also an inspiration for him to become a director; her experience as a singer helped him understand how music was used in a scene. Rob often felt pressured about measuring up to his father's successful streak, with twelve Emmys and other prestigious awards.
        
        When Rob graduated high school, his parents advised him to participate in Summer Theatre. Reiner got a job as an apprentice in the Bucks County Playhouse in Pennsylvania. He went on to UCLA Film School to further his education. Reiner felt he still wasn't successful even having a recurring role on one of the biggest shows in the country, All in the Family. He began his directing career with the Oscar-nominated films This Is Spinal Tap, Stand By Me, and The Princess Bride.
        
        In 1987, with these successful box-office movies under his belt, Reiner founded his own production company, Castle Rock Entertainment; along with Martin Shafer, Andrew Scheinman, Glenn Padnick, and Alan Horn. Under Castle Rock Entertainment, he went to direct Oscar-nominated films When Harry Met Sally, Misery, and A Few Good Men. Reiner has credited former co-star Carroll O'Connor in helping him get into the directing business, showing Reiner the ropes.
        
        Reiner is known as a political activist, co-founding the American Foundation For Equal Rights, a group that was an advisory for same-sex-marriage. He has spoken at several rallies on several topics, an advocate for social change regarding such issues as domestic violence and tobacco use.
        
        Reiner made cameo appearances on television shows 30 Rock, The Simpsons, and Hannah Montana, and in films The First Wives Club, Bullets Over Broadway, Primary Colors, and Throw Momma From The Train, among many others.`
    },
    {
        'Name': 'Kevin Reynolds',
        'Birth': '1952',
        'Death': '',
        'Bio': `Raised as an Air Force brat, Kevin Reynolds' love for cinema inspired him to forsake his law school degree and move to Los Angeles to enroll in the University of Southern California's legendary film school. Reynolds' graduate thesis film "Proof" became the basis for "Fandango" starring Kevin Costner and was produced by Steve Spielberg's Amblin Entertainment as one of its first productions. During his time at USC, Reynolds also wrote the Cold War cult hit "Red Dawn," which John Milius directed.

        Reynolds also directed "The Beast," "Robin Hood: Prince of Thieves," "Rapa Nui," "Waterworld," "The Count of Monte Cristo," "Tristan + Isolde," and "One Eight Seven," as well as the "You Gotta Believe Me" episode of Spielberg's anthology television series, "Amazing Stories."
        
        Most recently, Reynolds directed 'Hatfields & McCoys' for History Channel and Sony Pictures Television.`
    },
    {
        'Name': 'Christopher Nolan',
        'Birth': '1970',
        'Death': '',
        'Bio': `Best known for his cerebral, often nonlinear, storytelling, acclaimed writer-director Christopher Nolan was born on July 30, 1970, in London, England. Over the course of 15 years of filmmaking, Nolan has gone from low-budget independent films to working on some of the biggest blockbusters ever made.

        At 7 years old, Nolan began making short movies with his father's Super-8 camera. While studying English Literature at University College London, he shot 16-millimeter films at U.C.L.'s film society, where he learned the guerrilla techniques he would later use to make his first feature, Following (1998), on a budget of around $6,000. The noir thriller was recognized at a number of international film festivals prior to its theatrical release and gained Nolan enough credibility that he was able to gather substantial financing for his next film.
        
        Nolan's second film was Memento (2000), which he directed from his own screenplay based on a short story by his brother Jonathan. Starring Guy Pearce, the film brought Nolan numerous honors, including Academy Award and Golden Globe Award nominations for Best Original Screenplay. Nolan went on to direct the critically acclaimed psychological thriller, Insomnia (2002), starring Al Pacino, Robin Williams and Hilary Swank.
        
        The turning point in Nolan's career occurred when he was awarded the chance to revive the Batman franchise in 2005. In Batman Begins (2005), Nolan brought a level of gravitas back to the iconic hero, and his gritty, modern interpretation was greeted with praise from fans and critics alike. Before moving on to a Batman sequel, Nolan directed, co-wrote, and produced the mystery thriller The Prestige (2006), starring Christian Bale and Hugh Jackman as magicians whose obsessive rivalry leads to tragedy and murder.
        
        In 2008, Nolan directed, co-wrote, and produced The Dark Knight (2008) which went on to gross more than a billion dollars at the worldwide box office. Nolan was nominated for a Directors Guild of America (D.G.A.) Award, Writers Guild of America (W.G.A.) Award and Producers Guild of America (P.G.A.) Award, and the film also received eight Academy Award nominations.
        
        In 2010, Nolan captivated audiences with the sci-fi thriller Inception (2010), which he directed and produced from his own original screenplay. The thought-provoking drama was a worldwide blockbuster, earning more than $800,000,000 and becoming one of the most discussed and debated films of the year. Among its many honors, Inception received four Academy Awards and eight nominations, including Best Picture and Best Screenplay. Nolan was recognized by his peers with D.G.A. and P.G.A. Award nominations, as well as a W.G.A. Award for his work on the film.
        
        One of the best-reviewed and highest-grossing movies of 2012, The Dark Knight Rises (2012) concluded Nolan's Batman trilogy. Due to his success rebooting the Batman character, Warner Bros. enlisted Nolan to produce their revamped Superman movie Man of Steel (2013), which opened in the summer of 2013. In 2014, Nolan directed, wrote, and produced the science-fiction epic Interstellar (2014), starring Matthew McConaughey, Anne Hathaway and Jessica Chastain. Paramount Pictures and Warner Bros. released the film on November 5, 2014, to positive reviews and strong box-office results, grossing over $670 million dollars worldwide.
        
        Nolan resides in Los Angeles, California with his wife, producer Emma Thomas, and their children. Nolan and Thomas also have their own production company, Syncopy.`
    },
    {
        'Name': 'Jon Favreau',
        'Birth': '1966',
        'Death': '',
        'Bio': `Initially an indie film favorite, actor Jon Favreau has progressed to strong mainstream visibility into the millennium and, after nearly two decades in the business, is still enjoying character stardom as well as earning notice as a writer/producer/director.

        The amiable, husky-framed actor with the tight, crinkly hair was born in Queens, New York on October 19, 1966, the only child of Madeleine (Balkoff), an elementary school teacher, and Charles Favreau, a special education teacher. His father has French-Canadian, German, and Italian ancestry, and his mother was from a Russian Jewish family. He attended the Bronx High School of Science before furthering his studies at Queens College in 1984. Dropping out just credits away from receiving his degree, Jon moved to Chicago where he focused on comedy and performed at several Chicago improvisational theaters, including the ImprovOlympic and the Improv Institute. He also found a couple of bit parts in films.
        
        While there, he earned another bit role in the film, Rudy (1993), and met fellow cast mate Vince Vaughn. Their enduring personal friendship would play an instrumental role in furthering both their professional careers within just a few years. Jon broke into TV with a role on the classic series, Seinfeld (1989) (as "Eric the Clown"). After filming rudimentary roles in the movies Mrs. Parker and the Vicious Circle (1994), Notes from Underground (1995) and Batman Forever (1995), he decided to do some risk taking by writing himself and friend Vaughn into what would become their breakthrough film. Swingers (1996), which he also co-produced, centers on Jon as a luckless, struggling actor type who is emotionally shattered after losing his girlfriend, but is pushed back into the L.A. social scene via the help of cool, worldly, outgoing actor/buddy Vaughn. These two blueprint roles went on to define the character types of both actors on film.
        
        In 1997, Jon appeared favorably on several episodes of the popular TV sitcom, Friends (1994), as "Pete Becker", the humdrum but extremely wealthy suitor for Courteney Cox's "Monica" character, and also appeared to fine advantage on the Tracey Takes On... (1996) comedy series. He later took on the biopic mini-movie, Rocky Marciano (1999), portraying the prizefighter himself in a highly challenging dramatic role and received excellent reviews. Other engagingly offbeat "everyman" films roles came Jon's way -- the ex-athlete in the working class film, Dogtown (1997); a soon-to-be groom whose bachelor party goes horribly awry in the comedy thriller Very Bad Things (1998); a newlywed opposite Famke Janssen in Love & Sex (2000); a wild and crazy linebacker in The Replacements (2000); as Ben Affleck's legal partner in Daredevil (2003); and another down-and-out actor in The Big Empty (2003). He wrote and directed himself and Vaughn as two fellow boxers who involve themselves in criminal activity in Made (2001). Both he and Vaughn produced. He also directed the highly popular Will Ferrell comedy Elf (2003), in which he had a small part.
        
        Jon went on to re-team favorably with his friend, Vince Vaughn, who enjoyed a meteoric rise into the comedy star ranks, in such light-weight features as The Break-Up (2006), Four Christmases (2008) and Couples Retreat (2009), the last of which he co-wrote with Vaughn.
        
        Jon has made even greater strides as a writer, producer and/or director in recent years with the exciting mega-box office action-packed Iron Man (2008), starring Robert Downey Jr., and its sequels, Iron Man 2 (2010) and Iron Man 3 (2013). Jon's character of "Happy Hogan" would be featured in a number of Marvel Comic adventures. Other offerings behind the scenes have included the adventure dramedy Chef (2014), in which he also starred in the title role; the revamped film version of The Avengers (2012) also starring Downey Jr., and it's sequels Avengers: Age of Ultron (2015), Avengers: Infinity War (2018) and Avengers: Endgame (2019); and the animated Disney features The Jungle Book (2016) and The Lion King (2019) and the TV series The Chef Show (2019).
        
        Favreau's marriage to Joya Tillem on November 24, 2000, produced son Max and two daughters, Madeleine and Brighton Rose. Joya is the niece of KGO (AM) lawyer and talk show host, Len Tillem. On the sly, the actor/writer/producer/director enjoys playing on the World Poker Tour.`
    },
    {
        'Name': 'Melvin Frank',
        'Birth': '1913',
        'Death': '1988',
        'Bio': `Melvin Frank was half of a famous screenwriting partnership. The other half of the collaborative effort was Norman Panama. The two men became close friends while attending the University of Chicago. Frank had initially pursued a degree in engineering, but was persuaded by Panama to switch to English instead. In 1938 he and Panama moved to Hollywood and embarked on a career writing radio scripts and gags for Bob Hope and Milton Berle. Specializing in light comedy, they came up with the original story line for Hope's My Favorite Blonde (1942). This opened the door for a joint screenwriting contract with Paramount (1941-46), their prolific work together culminating in an Oscar nomination for the popular Bob Hope-Bing Crosby vehicle, Road to Utopia (1945).

        Continuing their run of witty comedies, Frank and Panama next wrote and produced the Cary Grant-Myrna Loy box-office hit Mr. Blandings Builds His Dream House (1948), adapted from a satirical novel by Eric Hodgins (about a couple whose dream of home ownership turns into a nightmare). From then on Frank and Panama alternated as directors and producers, first at MGM (1950-52), then at Paramount (1954-59). Of some ten top-grossing collaborations, their most rewarding effort was the highly entertaining medieval adventure spoof, The Court Jester (1955), starring Danny Kaye, lavishly filmed in VistaVision and Technicolor. They also turned out an award-winning Broadway play, "Li'l Abner", based on a comic strip by Al Capp. It premiered in November 1956 and ran for 653 performances over 87 weeks, before closing in July 1958. Frank and Panama brought it to the screen (Li'l Abner (1959)) the following year.
        
        The successful partnership came to an end with the final installment in the Hope-Crosby "road pictures", The Road to Hong Kong (1962). Subsequently, Frank and Panama--cordially--went their separate ways, Frank becoming a solo director and (from 1965) producer, but continuing to write comedy scripts in conjunction with others. In retrospect, his career over the next two decades was by far the more productive of the two, encompassing as producer/director the bittersweet adaptation of a play by Neil Simon, The Prisoner of Second Avenue (1975); and as producer/director/writer of the popular sex comedy A Touch of Class (1973), nominated for an Academy Award as Best Picture.`
    },
    {
        'Name': 'Norman Panama',
        'Birth': '1914',
        'Death': '2003',
        'Bio': `Norman Panama was born on April 21, 1914 in Chicago, Illinois, USA. He was a writer and director, known for Knock on Wood (1954), Mr. Blandings Builds His Dream House (1948) and Above and Beyond (1952). He died on January 13, 2003 in Los Angeles, California, USA.`
    },
    {
        'Name': 'Sergio Leone',
        'Birth': '1929',
        'Death': '1989',
        'Bio': `Sergio Leone was virtually born into the cinema - he was the son of Roberto Roberti (A.K.A. Vincenzo Leone), one of Italy's cinema pioneers, and actress Bice Valerian. Leone entered films in his late teens, working as an assistant director to both Italian directors and U.S. directors working in Italy (usually making Biblical and Roman epics, much in vogue at the time). Towards the end of the 1950s he started writing screenplays, and began directing after taking over The Last Days of Pompeii (1959) in mid-shoot after its original director fell ill. His first solo feature, The Colossus of Rhodes (1961), was a routine Roman epic, but his second feature, A Fistful of Dollars (1964), a shameless remake of Akira Kurosawa's Yojimbo (1961), caused a revolution. It was the first Spaghetti Western, and shot T.V. cowboy Clint Eastwood to stardom (Leone wanted Henry Fonda or Charles Bronson but couldn't afford them). The two sequels, For a Few Dollars More (1965) and The Good, the Bad and the Ugly (1966), were shot on much higher budgets and were even more successful, though his masterpiece, Once Upon a Time in the West (1968), in which Leone finally worked with Fonda and Bronson, was mutilated by Paramount Pictures and flopped at the U.S. box office. He directed Duck, You Sucker! (1971) reluctantly (as producer he hired Peter Bogdanovich to direct but he left before shooting began), and turned down offers to direct The Godfather (1972) in favor of his dream project, which became Once Upon a Time in America (1984). He died in 1989 after preparing an even more expensive Soviet co-production on the World War II siege of Leningrad.`
    },
    {
        'Name': 'John Pasquin',
        'Birth': '1945',
        'Death': '',
        'Bio': `John Pasquin was born on June 8, 1945. He is a director and producer, known for The Santa Clause (1994), Miss Congeniality 2: Armed & Fabulous (2005) and Home Improvement (1991). He has been married to JoBeth Williams since March 14, 1982. They have two children.`
    },
    {
        'Name': 'John Francis Daley',
        'Birth': '1985',
        'Death': '',
        'Bio': `John Francis Daley began acting in the national and international tour of The Who's Tommy, playing young Tommy - and coming to national prominence in the critically acclaimed, cult classic series, Freaks and Geeks (1999). Formerly a regular on the Fox hit, Bones (2005), John can also be seen in the Lions Gate comedy, Waiting and the upcoming Rapture-Palooza (2013), opposite Anna Kendrick and Craig Robinson.

        Now enjoying a successful screenwriting career, with his writing partner, Jonathan Goldstein, the two have sold several scripts in the past three years, including the summer hit, Horrible Bosses (2011).
        
        As well as being an actor and screenwriter, John is also a musician, playing keyboard and singing lead vocals in his band, Dayplayer soon to release their first CD.`
    },
    {
        'Name': 'Jonathan Goldstein',
        'Birth': '1968',
        'Death': '',
        'Bio': `Jonathan Goldstein was born on September 2, 1968 in New York City, New York, USA. He is a director and writer, known for Spider-Man: Homecoming (2017), Horrible Bosses (2011) and Game Night (2018). He has been married to Adena Halpern since August 26, 2007. They have one child.`
    },
    {
        'Name': 'Tim McCanlies',
        'Birth': '1953',
        'Death': '',
        'Bio': `Tim McCanlies was born in 1953. He is a writer and director, known for The Iron Giant (1999), Dancer, Texas Pop. 81 (1998) and Secondhand Lions (2003).`
    },
    {
        'Name': 'Dean DeBlois',
        'Birth': '1970',
        'Death': '',
        'Bio': `Dean DeBlois is a Canadian writer, director, and producer known best for having co-written and co-directed Disney's Lilo & Stitch (2002) and Dreamworks' How to Train Your Dragon (2010), both Oscar nominated. While working as an assistant animator and layout artist for Hinton Animation Studios in Ottawa, Ontario, DeBlois simultaneously attended Sheridan College's three year Classical Animation program. Upon graduation in 1990, DeBlois was immediately hired by Don Bluth Studios in Dublin, Ireland. There, he cut his teeth as a layout artist, character designer, and storyboard assistant to Don Bluth on such films as Thumbelina (1994) and A Troll in Central Park (1994)." In 1994, DeBlois left Ireland to work for Walt Disney Feature Animation as a storyboard artist, where he soon replaced his frequent collaborator, Chris Sanders, as Head of Story on Mulan (1998)." Shortly thereafter, they re-re-teamed to create the lush and whimsical Lilo & Stitch (2002), heralded by critics as Disney's last great hand-drawn film. Following its release in 2002, DeBlois sold several original live action feature projects to write, direct, and produce, including "The Banshee and Finn Magee," "The Lighthouse," and "Sightings," set-up at Walt Disney Pictures, Touchstone, and Universal Studios respectively. At present, all three remain in development. 2007 unveiled DeBlois' first foray into documentary filmmaking, with the acclaimed feature length music film, Sigur Rós: Heima (2007), chronicling the homecoming concert odyssey of Iceland's famed post-rock phenomenon, Sigur Rós. In October of 2008, DeBlois returned to feature animation to co-write and co-direct Dreamworks then-troubled How to Train Your Dragon (2010), once again re-teaming with Chris Sanders. The two re-envisioned the story from scratch, leading the production to its March 26, 2010 release, at break-neck speed. The resulting film earned Dreamworks Animation its highest critical acclaim to date and became the studio's top grossing film outside of the "Shrek" franchise. During this same time, DeBlois also directed another feature-length music film for Sigur Rós front-man Jónsi, entitled Go Quiet (2010), as well as a feature length concert film entitled "Jónsi: Live at The Wiltern." At present, DeBlois is writing, directing, and executive producing the highly anticipated sequel to How to Train Your Dragon (2010), "which he describes as "the epic second act of a much larger story".`
    },
    {
        'Name': 'Chris Sanders',
        'Birth': '1962',
        'Death': '',
        'Bio': `Born and raised in Colorado, Chris Sanders fell in love with animation at the age of ten after seeing Ward Kimball animated shorts on 'The Wonderful World of Disney'. He began drawing, and applied to CalArts after his grandmother told him about the animation program at the school. He majored in character animation, and graduated in 1984, moving on to work at Marvel Comics. He helped draw the characters for the show _Muppet Babies (1984)_. He then moved over to the Walt Disney Company in 1987, working in the visual development department. After doing some minor work on The Rescuers Down Under (1990), Sanders catapulted to the top of Disney animation through his work on Beauty and the Beast (1991) and The Lion King (1994). He helped write the 1998 Disney animated hit Mulan (1998), which moved him into the position to write, direct, and voice Lilo & Stitch (2002). Sanders moved to Dreamworks where he co-wrote, co-directed and did character design for How to Train Your Dragon (2010). Regardless of which studio he works for, he has become a recognizable force as an animator in both cel- and CGI-based features.`
    },
    {
        'Name': 'Dean Parisot',
        'Birth': '',
        'Death': '',
        'Bio': `Dean Parisot is known for Galaxy Quest (1999), RED 2 (2013) and Bill & Ted Face the Music (2020). He was previously married to Sally Menke.`
    },
    {
        'Name': 'Robert Zemeckis',
        'Birth': '1952',
        'Death': '',
        'Bio': `A whiz-kid with special effects, Robert is from the Spielberg camp of film-making (Steven Spielberg produced many of his films). Usually working with writing partner Bob Gale, Robert's earlier films show he has a talent for zany comedy (Romancing the Stone (1984), 1941 (1979)) and special effect vehicles (Who Framed Roger Rabbit (1988) and Back to the Future (1985)). His later films have become more serious, with the hugely successful Tom Hanks vehicle Forrest Gump (1994) and the Jodie Foster film Contact (1997), both critically acclaimed movies. Again, these films incorporate stunning effects. Robert has proved he can work a serious story around great effects.`
    }
];





// setup Logging
const accessLogStream = fs.createWriteStream( // create a write stream
    path.join(__dirname, 'log.text'), //a 'log.txt' file is created in the root directory
    { flags: 'a' } // path.join appends it to 'log.text'
);

app.use(morgan('combined', { stream: accessLogStream })); // enable morgan logging to 'log.txt'





// setup User Authentication





// setup JSON Parsing





// setup Static Files
app.use(
    express.static('public') // routes all requests for static files to the 'public' folder
);





// setup App Routing

// CREATE - Allow new users to register
app.post('/users', (req, res) => {
    const newUser = req.body;

    if (newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser);
    } else {
        res.status(400).send('users need names')
    }
});

// CREATE - Allow users to add a movie to their list of favorites
app.post('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        user.favoriteMovies.push(movieTitle);
        res.status(200).send(`${movieTitle} has been added to ${user.name}'s (${id}) list of favorite movies!`);
    } else {
        res.status(400).send('no such user');
    }
});

// READ - Greeting
app.get('/', (req, res) => {
    res.send('Welcome to myFlix!');
});

// READ - Return a list of ALL movies to the user
app.get('/movies', (req, res) => {
    res.status(200).json(movies);
});

// READ - Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user
app.get('/movies/:movieTitle', (req, res) => {
    const { movieTitle } = req.params;
    const movie = movies.find(movie => movie.Title === movieTitle);

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('no such movie');
    }
});

// READ - Return data about a genre (description) by name/title (e.g., “Thriller”)
app.get('/genres/:genreName', (req, res) => {
    const { genreName } = req.params;
    const genre = genres.find(genre => genre.Name === genreName);

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send('no such genre');
    }
});

// READ - Return data about a director (bio, birth year, death year) by name
app.get('/directors/:directorName', (req, res) => {
    const { directorName } = req.params;
    const director = directors.find(director => director.Name === directorName);

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send('no such director');
    }
});

// UPDATE - Allow users to update their user info (username)
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    let user = users.find(user => user.id == id);

    if (user) {
        user.name = updatedUser.name;
        res.status(200).json(user);
    } else {
        res.status(400).send('no such user');
    }
});

// DELETE - Allow users to remove a movie from their list of favorites
app.delete('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        user.favoriteMovies = user.favoriteMovies.filter(title => title !== movieTitle);
        res.status(200).send(`${movieTitle} has been removed from ${user.name}'s (${id}) list of favorite movies.`);
    } else {
        res.status(400).send('no such user');
    }
});

// DELETE - Allow existing users to deregister
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        users = users.filter(user => user.id != id);
        res.status(200).send(`User ${id} (${user.name}) has been deleted.`);
    } else {
        res.status(400).send('no such user');
    }
});





// Listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});





// setup Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack); // information about the error will be logged to the terminal, then logged in the console
    res.status(500).send('Something broke!')
});