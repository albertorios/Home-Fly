from selenium import webdriver
from selenium.webdriver.common.keys import Keys
driver = webdriver.Chrome("./chromedriver")
driver.manage().timeouts().pageLoadTimeout(5, TimeUnit.SECONDS);
driver.get("http://www.shelterlistings.org/city/chicago-il.html")
elems = driver.find_elements_by_tag_name('a')
links = [];
for e in elems:
	link = e.get_attribute('href')
	if('details' in link):
		links.append((e.text,link))
for link in links:
	print(link[0])
	driver.get(link[1])
	click_this = driver.find_element_by_id('seeaddress')
	click_this.click()
	print(driver.page_source)
driver.close()
