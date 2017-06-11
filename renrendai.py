# -*- coding: utf-8 -*-
import os
import requests
import re


class RenRenDai():

    def __init__(self):
        self.s = requests.Session()
        self.s.headers['User-Agent'] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.131 Safari/537.36'
        requests.adapters.DEFAULT_RETRIES = 5

    def get_infor(self,text):
        r_credit_info = re.compile(r'<script id=\"credit-info-data\" type=\"text/x-json\">(.*?)</script>')
        credit_info = re.search(r_credit_info, text).group(1)
        
        r_status = re.compile(r'<div class=\"stamp\"><em class=\"(.*?)\">')
        try:
            status = re.search(r_status, text).group(1)
        except:
            status = 'na'
        
        r_title = re.compile(r'\"title\":\"(.*?)\"')
        title = re.search(r_title, credit_info).group(1)
        
        r_load_id = re.compile(r'\"loanId\":(.*?),')
        load_id = re.search(r_load_id, credit_info).group(1)
        
        r_amount = re.compile(r'\"amount\":(.*?),')
        amount = re.search(r_amount, credit_info).group(1)
        
        r_interest = re.compile(r'\"interest\":(.*?),')
        interest = re.search(r_interest, credit_info).group(1)
        
        r_months = re.compile(r'\"months\":(.*?),')
        months = re.search(r_months, credit_info).group(1)
        
        r_description = re.compile(r'\"description\":\"(.*?)\"')
        description = re.search(r_description, credit_info).group(1)
        
        r_borrowerLevel = re.compile(r'\"borrowerLevel\":\"(.*?)\"')
        borrowerLevel = re.search(r_borrowerLevel, credit_info).group(1)

        #r_borrowerId = re.compile(r'\"borrowerId\":(.*?)')
        #borrowerId = re.search(r_borrowerId, credit_info).group(1)
        
        r_openTime = re.compile(r'\"openTime\":\"(.*?)\"')
        openTime = re.search(r_openTime, credit_info).group(1)
        
        r_finishedRatio = re.compile(r'\"finishedRatio\":(.*?),')
        finishedRatio = re.search(r_finishedRatio, credit_info).group(1)
        
        return str(load_id) + '\t' + str(amount) + '\t' + str(interest) + '\t' + str(months) + '\t' + str(description) + '\t' + str(borrowerLevel) +'\t'+ str(openTime) + '\t' + str(finishedRatio) + '\t' + str(title) + '\t' + str(status)
        
    def get_page(self,url):
        
        r = self.s.get(url)
        return r.text

    def run(self):
        pre_url = 'http://www.we.com/lend/detailPage.action?loanId='
        flag = 0
        i = 4884
        ii = 2000000
        while flag<10:
            url = pre_url + str(ii+i)
            text = self.get_page(url).encode('utf8')
            if len(text) < 10000 :
                flag += 1
            else:
                flag = 0
                pp = self.get_infor(text)
                
                f = open('bid_list.txt', 'a')
                f.write(pp + '\n')
                f.close()
            print str(i) + ' ' + str(len(text)) + ' ' + url
            i = i + 1
            break;
            
if __name__ == '__main__':
    crawler = RenRenDai()
    crawler.run()

