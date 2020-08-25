export const getFaucetGrant = () => {
  const faucetGrant = localStorage.getItem('faucet-grant-cid')
  if (!faucetGrant) return { cid: '', address: '', sentAddress: '' }
  return JSON.parse(faucetGrant)
}

export const setFaucetGrant = (msgCid, filecoinAddress, sentAddress) => {
  const item = { cid: msgCid, address: filecoinAddress, sentAddress }
  if (!getFaucetGrant().cid)
    localStorage.setItem('faucet-grant-cid', JSON.stringify(item))
}

export const removeFaucetGrantCid = () => {
  localStorage.removeItem('faucet-grant-cid')
}
