// EDIT ME: every message in the experience lives here.
export const messages = {
  welcome: { lines: ['Hey Youuu!! 👀❤️', 'Soooo... I made something special for you.', "Don't laugh, okay?", "I'm already feeling shy. 🙈"], button: 'Okay, Show Me! 💗' },
  quizTitle: 'How well do you know me? 🧐',
  quizNotice: 'Psst... your quiz answers may be saved so I can see how well you know me. 🙈❤️',
  reactions: ['Ooooh, interesting choice! 👀', 'Hmm... bold. I respect it 😌', 'Noted!! 📝💗', 'Brave answer, mister 😂', 'I am watching you 🧐', 'Okay okay okay 🙈'],
  saveError: "Oops! My little server is napping, so your answers weren't saved. 😭 Please try again in a moment.",
  // first matching rule wins (checked top to bottom, by percentage correct)
  scoreMessages: [
    { min: 100, title: 'PERFECT?! 🥹', text: 'You know me better than I know myself. Okay, I am officially impressed (and a little shy).' },
    { min: 60, title: 'Not bad at all! 😌', text: 'You know me pretty well! A few more cute lessons and you will be a pro.' },
    { min: 0, title: 'Hmmmm... 😂', text: 'We need more dates to study this subject. Homework: spend more time with me. ❤️' },
  ],
  game: {
    heading: 'One Very Important Question...', question: 'DO YOU LOVE ME? 🥺', yes: 'YESSS! ❤️', no: 'NO 🙃', maxNo: 6,
    noReplies: ['Excuse me??? Try again! 😭', 'Wrong button, mister! 😂', 'Nice try! I know you love me! 💗'],
    enough: 'Okay okay, enough drama. We both know the answer! 😌❤️',
    success: 'YAYYYYY! I KNEW IT!! 🥹❤️', followUp: "See?? I knew you couldn't resist me! 😂",
    saving: 'Saving your answers... 💾', saved: 'Your answers are safely saved! 💌', saveError: "Couldn't save your answers just yet. 😭", retry: 'Try saving again', next: 'Continue 💌',
  },
  confession: { intro: 'Umm... I have something to tell you.', button: 'Open My Little Letter 💌', next: 'One more thing... 🎁', skip: 'Skip typing',
    letter: ['Okay, so...', "I'm actually very shy when it comes to expressing feelings.", "Sometimes I don't know what to say, or how to say it.", 'But I made this little website just for you.', 'And I hope it makes you smile.', "That's all...", "Okay bye, I'm shy again. 🙈❤️"] },
  final: { heading: 'Waittt! One Last Thing...', button: 'Open Your Surprise 🎁', title: 'CONGRATULATIONS!! 🎉', sub: "You've unlocked:",
    perks: ['💗 Unlimited hugs', '💗 Endless annoying messages', '💗 Random cute moments', '💗 Unlimited reasons to smile'],
    outro: 'And one very shy girl who made an entire website just for you.', refunds: 'NO REFUNDS!! 😂❤️',
    footer: "I couldn't say it properly, so I coded it instead. 🙈", restart: 'Play again 🔁' },
};
