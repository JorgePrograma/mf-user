export class Config{
  static TOKEN = "eyJ4NXQjUzI1NiI6ImVzWl9jdFlSY2d6NHlLNktfSl95SVVXeU93N1NWSXNqaG8yOTJsY3AwZTgiLCJ4NXQiOiI3NldhcDJrMHFnbDRVWmVuMzdNZ1VkRnc5UTQiLCJraWQiOiJTSUdOSU5HX0tFWSIsImFsZyI6IlJTMjU2In0.eyJjbGllbnRfb2NpZCI6Im9jaWQxLmRvbWFpbmFwcC5vYzEuc2EtYm9nb3RhLTEuYW1hYWFhYWF0c2tlcmphYXpmZzJ5ZTY3ZDJ5cnVhc2U3bzQyaWVnYmEzd2hwM3U2bWJjdzQ3eXVncGxxIiwidXNlcl90eiI6IkFtZXJpY2EvQ2hpY2FnbyIsInN1YiI6ImpvdmFsbGVAaW5mb2RvYy5jb20uY28iLCJ1c2VyX2xvY2FsZSI6ImVuIiwic2lkbGUiOjQ4MCwidXNlci50ZW5hbnQubmFtZSI6ImlkY3MtNTRhZjAwNDBjOTg5NGJmZGI3YjQ3MjY0MjhmMzI1ZGIiLCJpc3MiOiJodHRwczovL2lkZW50aXR5Lm9yYWNsZWNsb3VkLmNvbS8iLCJkb21haW5faG9tZSI6InNhLWJvZ290YS0xIiwiY2Ffb2NpZCI6Im9jaWQxLnRlbmFuY3kub2MxLi5hYWFhYWFhYXE1cW9kZDZ1NXhhdDZodDZ6cjU0M2UyN2U3aHhncjUyZTZkbTRpZWFvMnRxNnQzMnRuZGEiLCJ1c2VyX3RlbmFudG5hbWUiOiJpZGNzLTU0YWYwMDQwYzk4OTRiZmRiN2I0NzI2NDI4ZjMyNWRiIiwiY2xpZW50X2lkIjoiZjFjM2ZkOWE5OWY5NDNiMWE3NjkzMWVmMGM0MTgzNGIiLCJkb21haW5faWQiOiJvY2lkMS5kb21haW4ub2MxLi5hYWFhYWFhYW82NnZ5bDZiYmlnbmdlNW10Ym52bmFlemE2cXQ0d3VvcG5panlqYnZrazR1d215eXNoaXEiLCJzdWJfdHlwZSI6InVzZXIiLCJzY29wZSI6Ii9jcmVhdGVCcmFuY2giLCJ1c2VyX29jaWQiOiJvY2lkMS51c2VyLm9jMS4uYWFhYWFhYWFodmhid25ycXFidzYycWptM3Jyc3Rkb3hpbzRra2RrNHJsbnRmZWZyYWRtbWszZzNqMndxIiwiY2xpZW50X3RlbmFudG5hbWUiOiJpZGNzLTU0YWYwMDQwYzk4OTRiZmRiN2I0NzI2NDI4ZjMyNWRiIiwicmVnaW9uX25hbWUiOiJzYS1ib2dvdGEtaWRjcy0xIiwidXNlcl9sYW5nIjoiZW4iLCJleHAiOjE3NDQ2NDkzNTMsImlhdCI6MTc0NDY0NTc1MywiY2xpZW50X2d1aWQiOiI5NjBmMWFjMWRhZmY0ZDdhYTZlMDMzZWVlNDM0NmI4MSIsImNsaWVudF9uYW1lIjoiUHJ1ZWJhIFJFU1QiLCJ0ZW5hbnQiOiJpZGNzLTU0YWYwMDQwYzk4OTRiZmRiN2I0NzI2NDI4ZjMyNWRiIiwianRpIjoiOWJhYTgxMjg2YWVkNDc4NjliNGQwNTEwODhiYWMwOGQiLCJndHAiOiJybyIsInVzZXJfZGlzcGxheW5hbWUiOiJKZXJzc29uIE92YWxsZSIsIm9wYyI6ZmFsc2UsInN1Yl9tYXBwaW5nYXR0ciI6InVzZXJOYW1lIiwicHJpbVRlbmFudCI6dHJ1ZSwidG9rX3R5cGUiOiJBVCIsImF1ZCI6Imh0dHBzOi8vaTNwZXdob290dHN3YXZxaXNyZWQ1ZnI1YXUuYXBpZ2F0ZXdheS5zYS1ib2dvdGEtMS5vY2kuY3VzdG9tZXItb2NpLmNvbS9hcGkvdjEiLCJjYV9uYW1lIjoiaWRzb3BvcnRlIiwidXNlcl9pZCI6IjI3Y2MwMWU1ZTQxODQ1YWY5YjIwNjkwOWM0M2E3YzBlIiwiZG9tYWluIjoiRGVmYXVsdCIsInRlbmFudF9pc3MiOiJodHRwczovL2lkY3MtNTRhZjAwNDBjOTg5NGJmZGI3YjQ3MjY0MjhmMzI1ZGIuaWRlbnRpdHkub3JhY2xlY2xvdWQuY29tOjQ0MyIsInJlc291cmNlX2FwcF9pZCI6IjA3ZTBjYzRkYzkwZDQ3OGU5Njk2NGY2OWQ1NTkxYjgyIn0.J5tt8Y4r7ZoFEuPgeZPLiAgiFQzJDXMXSVyLEw7U2-Z0q-3QvGPKdVBsYA0hv1_GRou3fngYS1GZyapi6AGgMnHadG1LLAnoMtDp95UTBLOa4FjMmwPMUrCmCUWiVGNgguiKKQL5K3NHQ_pDDtSTQQnkNkd_gq4RK7gOYFWmCn2Gd5OjcUNghWOVL4nwsq7-cRc2bdofoh3SR4yxaRhHtvbQJDEQR2rTTVG-PnHITNv2gFD3XnIF6p03XQ1qiitZ62gHsLL6zib1nz_u30FcWQqRnyn2v7xzUBNLmt_YSQZ989SGKan7tN6unVcFUpNtj96kLZb4jFwgyHh0Sffe8g";
}
