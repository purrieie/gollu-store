export const inr = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN')
export const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ')
