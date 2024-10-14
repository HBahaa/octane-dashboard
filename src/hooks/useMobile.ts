import { useMediaQuery } from '@mantine/hooks';

const useMobile = () => {
  const matches = useMediaQuery(`(max-width: 1024px)`);
  return matches;
};

export default useMobile;
