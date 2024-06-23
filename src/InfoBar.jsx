import { useEffect, useState } from 'react';

const InfoBar = ({ rake, setIteration }) => {
  const [toRake, setToRake] = useState([]);
  const [toRakeOdd, setToRakeOdd] = useState([]);
  const [toRakeEven, setToRakeEven] = useState([]);
  const [leavesToRakeFromLeftBranches, setLeavesToRakeFromLeftBranches] =
    useState([]);
  const [otherLeavesToRake, setOtherLeavesToRake] = useState([]);

  useEffect(() => {
    calculateRakeInfo();
  }, []);

  const calculateRakeInfo = () => {
    const { even, odd, leavesToRake, left, right } = rake?.getRakeInfo();
    setToRakeEven(even);
    setToRakeOdd(odd);
    setToRake(leavesToRake);
    setLeavesToRakeFromLeftBranches(left);
    setOtherLeavesToRake(right);
  };

  const displayLeaves = (leaves) => {
    return `[${leaves.map((leaf) => leaf.value).join(', ')}]`;
  };

  const rakeTree = () => {
    rake.rake();
    calculateRakeInfo();
    setIteration((iteration) => iteration + 1);
  };

  return (
    <div>
      <p>To rake: A = {displayLeaves(toRake)}</p>
      <p>A_odd = {displayLeaves(toRakeOdd)}</p>
      <p>A_even = {displayLeaves(toRakeEven)}</p>
      <p>Concurent rakes:</p>
      <p>a) {displayLeaves(leavesToRakeFromLeftBranches)}</p>
      <p>b) {displayLeaves(otherLeavesToRake)}</p>
      <button disabled={rake.isRakeFinished()} onClick={() => rakeTree()}>
        rake
      </button>
    </div>
  );
};

export default InfoBar;
