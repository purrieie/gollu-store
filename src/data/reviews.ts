export interface Review { name: string; city: string; product: string; rating: number; text: string; date: string }
export const REVIEWS: Review[] = [
  { name: 'Ananya R.', city: 'Pune', product: 'raw-deal', rating: 5, text: 'Opened it in the car, finished it before the signal turned green. Tastes exactly like the aam-with-namak from outside my school.', date: '2 weeks ago' },
  { name: 'Kabir M.', city: 'Delhi', product: 'kala-kaand', rating: 5, text: 'My whole face folded in half. Then I had four more. Please never discontinue.', date: '5 days ago' },
  { name: 'Riya S.', city: 'Bengaluru', product: 'tiffin-mix', rating: 5, text: 'Bought it as a birthday gift, kept three minis "for quality control". The box is genuinely cute.', date: '1 month ago' },
  { name: 'Farhan Q.', city: 'Hyderabad', product: 'paanic', rating: 5, text: 'After biryani this is elite. My dad called it "haan theek hai", which from him is a standing ovation.', date: '3 weeks ago' },
  { name: 'Meher K.', city: 'Mumbai', product: 'strawberry-drama', rating: 4, text: 'Proper sour belts! Wish the pouch was bigger, which I guess is a compliment.', date: '1 week ago' },
  { name: 'Tanvi P.', city: 'Ahmedabad', product: 'imli-please', rating: 5, text: 'The jaggery makes it. It tastes like the imli goli jar at my nani\'s kirana store.', date: '2 months ago' },
  { name: 'Arjun D.', city: 'Chennai', product: 'fizz-ed', rating: 5, text: 'Cola plus chaat masala should not work. It works. My roommate hid the pouch from me.', date: '4 days ago' },
  { name: 'Ishita B.', city: 'Kolkata', product: 'lychee-lately', rating: 5, text: 'Gentle, pretty, dangerously easy to eat. Perfect after the Kala Kaand destroyed me.', date: '3 weeks ago' },
  { name: 'Neel V.', city: 'Goa', product: 'guava-gossip', rating: 4, text: 'The chilli sneaks up on you in the best way. Like the guava cart on the way to the beach.', date: '1 month ago' },
  { name: 'Sana A.', city: 'Lucknow', product: 'kala-kaand', rating: 5, text: 'Made my entire office try it for a reel. Everyone ordered their own after.', date: '6 days ago' },
  { name: 'Dev J.', city: 'Jaipur', product: 'raw-deal', rating: 5, text: 'Finally a candy that understands Indian taste buds. Tangy first, sweet later, namak throughout.', date: '2 weeks ago' },
  { name: 'Pooja N.', city: 'Indore', product: 'class-bunk-box', rating: 5, text: 'Ordered for movie night, everyone fought over the Paanic!. Would bunk again.', date: '1 month ago' },
]
export const reviewsFor = (slug: string) => REVIEWS.filter((r) => r.product === slug)
