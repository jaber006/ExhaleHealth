-- Seed data — sample products matching the catalogue
-- Run after migration

-- Wild by Instinct (Canview)
insert into public.products (name, brand, type, nicotine_strength_mg, flavour, schedule, description, wholesale_price, retail_price, rrp, stock_quantity, tga_notified, active) values
('Wild by Instinct Mint 20mg', 'Wild by Instinct', 'pod', 20, 'Mint', 's3', 'Closed pod system. 20mg/mL nicotine salt. Cool mint flavour. TGA notified.', 1200, 2499, 2499, 50, true, true),
('Wild by Instinct Tobacco 20mg', 'Wild by Instinct', 'pod', 20, 'Tobacco', 's3', 'Closed pod system. 20mg/mL nicotine salt. Classic tobacco flavour. TGA notified.', 1200, 2499, 2499, 50, true, true),
('Wild by Instinct Menthol 12mg', 'Wild by Instinct', 'pod', 12, 'Menthol', 's3', 'Closed pod system. 12mg/mL nicotine salt for step-down therapy. TGA notified.', 1100, 2299, 2299, 30, true, true),
('Wild by Instinct Device Kit', 'Wild by Instinct', 'device', null, null, 's3', 'Rechargeable closed pod device. Includes USB-C charger.', 2000, 3999, 3999, 20, true, true);

-- LANAVAPE (Pharmacor)
insert into public.products (name, brand, type, nicotine_strength_mg, flavour, schedule, description, wholesale_price, retail_price, rrp, stock_quantity, tga_notified, active) values
('LANAVAPE Mint 20mg', 'LANAVAPE', 'pod', 20, 'Mint', 's3', 'Closed pod system. 20mg/mL nicotine. Refreshing mint. TGA notified.', 1100, 2499, 2499, 40, true, true),
('LANAVAPE Tobacco 20mg', 'LANAVAPE', 'pod', 20, 'Tobacco', 's3', 'Closed pod system. 20mg/mL nicotine. Smooth tobacco. TGA notified.', 1100, 2499, 2499, 40, true, true),
('LANAVAPE Device Kit', 'LANAVAPE', 'device', null, null, 's3', 'Rechargeable closed pod device with LED indicator. USB-C charging.', 1800, 3499, 3499, 15, true, true);

-- Nicotinell NRT (Sigma Connect)
insert into public.products (name, brand, type, nicotine_strength_mg, flavour, schedule, description, wholesale_price, retail_price, rrp, stock_quantity, tga_notified, active) values
('Nicotinell Gum Mint 4mg', 'Nicotinell', 'nrt_gum', 4, 'Mint', 'none', 'Sugar-free nicotine gum for heavy smokers. 96 pieces.', 2200, 3699, 3699, 30, false, true),
('Nicotinell Gum Mint 2mg', 'Nicotinell', 'nrt_gum', 2, 'Mint', 'none', 'Sugar-free nicotine gum for light-moderate smokers. 96 pieces.', 2000, 3499, 3499, 30, false, true),
('Nicotinell Gum Fruit 4mg', 'Nicotinell', 'nrt_gum', 4, 'Fruit', 'none', 'Fruit-flavoured nicotine gum for heavy smokers. 96 pieces.', 2200, 3699, 3699, 20, false, true),
('Nicotinell Patch 21mg Step 1', 'Nicotinell', 'nrt_patch', 21, null, 'none', '24-hour transdermal nicotine patch. Step 1 for heavy smokers. 7 patches.', 1800, 3299, 3299, 25, false, true),
('Nicotinell Patch 14mg Step 2', 'Nicotinell', 'nrt_patch', 14, null, 'none', '24-hour transdermal nicotine patch. Step 2 for step-down therapy. 7 patches.', 1700, 3099, 3099, 25, false, true),
('Nicotinell Patch 7mg Step 3', 'Nicotinell', 'nrt_patch', 7, null, 'none', '24-hour transdermal nicotine patch. Step 3 — final step-down. 7 patches.', 1500, 2899, 2899, 20, false, true),
('Nicotinell Lozenge Mint 4mg', 'Nicotinell', 'nrt_lozenge', 4, 'Mint', 'none', 'Sugar-free mint lozenges for heavy smokers. 36 lozenges.', 1200, 2199, 2199, 30, false, true),
('Nicotinell Lozenge Mint 2mg', 'Nicotinell', 'nrt_lozenge', 2, 'Mint', 'none', 'Sugar-free mint lozenges for light-moderate smokers. 36 lozenges.', 1100, 1999, 1999, 30, false, true);
