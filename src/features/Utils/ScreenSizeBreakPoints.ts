// px

const first = 576; 
const second = 768;
const third = 992;
const fourth = 1200;
const fith = 1400;

export const getBSSize = () => {
  
  const width = window.innerWidth;
  return width < first ? 'xs' :
    width >= first && width < second ? 'sm' :
    width >= second && width < third ? 'md' :
    width >= third && width < fourth ? 'lg' :
    width >= fourth && width < fith ? 'xl' : 'xxl';
}
